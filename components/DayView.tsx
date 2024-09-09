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
  currentDate: Date;
  events: Event[];
}

const DayView: React.FC<DayViewProps> = ({ handleTimeClick, currentDate, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventForHour = (hour: number) => {
    const hourStart = new Date(currentDate);
    hourStart.setHours(hour, 0, 0, 0);
    const hourEnd = new Date(currentDate);
    hourEnd.setHours(hour, 59, 59, 999);

    return events.find(event => 
      isWithinInterval(hourStart, { start: event.startDate, end: event.endDate }) ||
      isWithinInterval(hourEnd, { start: event.startDate, end: event.endDate })
    );
  };

  const getEventStyle = (event: Event, hour: number) => {
    const hourStart = new Date(currentDate);
    hourStart.setHours(hour, 0, 0, 0);
    const hourEnd = new Date(currentDate);
    hourEnd.setHours(hour + 1, 0, 0, 0);

    const eventStart = isSameDay(event.startDate, currentDate) ? event.startDate : hourStart;
    const eventEnd = isSameDay(event.endDate, currentDate) ? event.endDate : hourEnd;

    const startPercentage = ((eventStart.getTime() - hourStart.getTime()) / (60 * 60 * 1000)) * 100;
    const endPercentage = ((eventEnd.getTime() - hourStart.getTime()) / (60 * 60 * 1000)) * 100;

    return {
      top: `${Math.max(0, startPercentage)}%`,
      height: `${Math.min(100, endPercentage) - Math.max(0, startPercentage)}%`,
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
        const event = getEventForHour(hour);
        return (
          <div key={hour} className="flex items-center border-b border-gray-200 relative">
            <div className="w-16 text-right pr-2 text-sm text-gray-500">
              {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
            </div>
            <div
              className="flex-grow h-12 cursor-pointer hover:bg-gray-100"
              onClick={() => handleTimeClick(hour)}
            >
              {event && (
                <div style={getEventStyle(event, hour)}>
                  <div className="p-1 text-xs">{event.title}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;