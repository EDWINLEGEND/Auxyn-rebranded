export function ServerTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
  
  return <span suppressHydrationWarning>{timeString}</span>;
}