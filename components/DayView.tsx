import React from 'react';
import { format, isSameDay, isWithinInterval } from 'date-fns';

interface Event {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

interface DayViewProps {
  handleTimeClick: (hour: number) => void;
  handleEventClick: (event: Event) => void;
  currentDate: Date;
  events: Event[];
}

const DayView: React.FC<DayViewProps> = ({ handleTimeClick, handleEventClick, currentDate, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    const hourStart = new Date(currentDate);
    hourStart.setHours(hour, 0, 0, 0);
    const hourEnd = new Date(currentDate);
    hourEnd.setHours(hour + 1, 0, 0, 0);

    return events.filter(event => 
      (event.startDate < hourEnd && event.endDate > hourStart)
    );
  };

  const getEventStyle = (event: Event, hour: number) => {
    const hourStart = new Date(currentDate);
    hourStart.setHours(hour, 0, 0, 0);
    const hourEnd = new Date(currentDate);
    hourEnd.setHours(hour + 1, 0, 0, 0);

    const eventStart = new Date(Math.max(event.startDate.getTime(), hourStart.getTime()));
    const eventEnd = new Date(Math.min(event.endDate.getTime(), hourEnd.getTime()));

    const startPercentage = (eventStart.getTime() - hourStart.getTime()) / (60 * 60 * 1000) * 100;
    const heightPercentage = (eventEnd.getTime() - eventStart.getTime()) / (60 * 60 * 1000) * 100;

    return {
      top: `${startPercentage}%`,
      height: `${heightPercentage}%`,
      backgroundColor: 'rgba(220,52,30,0.5)',
      position: 'absolute' as const,
      left: 0,
      right: 0,
      zIndex: 10,
    };
  };

  return (
    <div className="mt-4">
      {hours.map((hour) => {
        const hourEvents = getEventsForHour(hour);
        return (
          <div key={hour} className="flex items-center border-b border-gray-200 relative h-24">
            <div className="w-16 text-right pr-2 text-sm text-gray-500">
              {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
            </div>
            <div
              className="flex-grow h-full cursor-pointer hover:bg-gray-100 relative"
              onClick={() => handleTimeClick(hour)}
            >
              {hourEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  style={getEventStyle(event, hour)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  {hour === event.startDate.getHours() && (
                    <div className="p-1 text-xs overflow-hidden whitespace-nowrap">
                      <span className="font-semibold">{event.title}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className="text-green-700 font-medium">${event.amount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;