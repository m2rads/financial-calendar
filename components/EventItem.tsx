import React from 'react';

interface Event {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

interface EventItemProps {
  event: Event;
  getEventStyle: (event: Event) => React.CSSProperties;
  handleEventClick: (event: Event) => void;
  showDetails: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, getEventStyle, handleEventClick, showDetails }) => {
  return (
    <div 
      style={getEventStyle(event)}
      onClick={(e) => {
        e.stopPropagation();
        handleEventClick(event);
      }}
      className="absolute left-0 right-0 z-10 cursor-pointer"
    >
      {showDetails && (
        <div className="p-1 text-xs overflow-hidden whitespace-nowrap">
          <span className="font-semibold">{event.title}</span>
          <span className="mx-1 text-gray-400">|</span>
          <span className="text-green-700 font-medium">${event.amount.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default EventItem;