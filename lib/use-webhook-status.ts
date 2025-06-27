"use client";

import { useState, useEffect } from 'react';

// Status types
export type WebhookStatus = 'online' | 'degraded' | 'offline' | 'loading';

export function useWebhookStatus() {
  const [status, setStatus] = useState<WebhookStatus>('loading');

  useEffect(() => {
    const checkWebhookStatus = async () => {
      try {
        // First try our local ping endpoint
        const localPingResponse = await fetch('/api/chat/ping', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch(() => null);

        if (localPingResponse && localPingResponse.ok) {
          setStatus('online');
          return;
        }

        // Fallback to direct webhook check
        const response = await fetch('https://webhook.botpress.cloud/10bd40c2-2f13-4bec-a0b2-7484aa343081', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'text',
            text: 'ping',
            conversationId: 'status-check',
          }),
        }).catch(error => {
          console.error('Webhook fetch error:', error);
          return null;
        });

        if (!response) {
          setStatus('offline');
          return;
        }

        if (response.ok) {
          try {
            // Check if response has valid structure
            const data = await response.json();
            if (data && (data.responses || Array.isArray(data))) {
              setStatus('online');
            } else {
              setStatus('degraded');
            }
          } catch (parseError) {
            console.error('Error parsing webhook response:', parseError);
            setStatus('degraded');
          }
        } else {
          setStatus('degraded');
        }
      } catch (error) {
        console.error('Error checking webhook status:', error);
        setStatus('offline');
      }
    };

    // Initial check
    checkWebhookStatus();

    // Check status every minute
    const interval = setInterval(checkWebhookStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
