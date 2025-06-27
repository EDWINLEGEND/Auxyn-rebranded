"use client";

import { formatTime, formatDateTime } from "@/lib/utils";

interface TimeDisplayProps {
  date: Date | string;
  showFullDateTime?: boolean;
  className?: string;
}

export function TimeDisplay({ date, showFullDateTime = false, className = "" }: TimeDisplayProps) {
  return (
    <span className={className} suppressHydrationWarning>
      {showFullDateTime ? formatDateTime(date) : formatTime(date)}
    </span>
  );
}