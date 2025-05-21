import { formatDistanceToNow } from 'date-fns';
import React from 'react';

// interface TimeAgoProps {
//   timestamp: string;
// }

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    console.log(formatDistanceToNow(new Date(), { addSuffix: true }))
    const timePeriod = formatDistanceToNow(new Date(timestamp), { addSuffix: true }); // Calculates "time ago"
    timeAgo = timePeriod;
  }

  return (
    <time dateTime={new Date(timestamp).toISOString()} title={new Date(timestamp).toLocaleString()}>
      &nbsp; <i>{timeAgo}</i>
    </time>
  );
};
