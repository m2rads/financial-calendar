import React from 'react';

interface DayViewProps {
  handleTimeClick: (hour: number) => void;
}

const DayView: React.FC<DayViewProps> = ({ handleTimeClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-2">
      {hours.map((hour) => (
        <div key={hour} className="flex items-center">
          <div className="w-16 text-right pr-2 text-sm">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
          <div 
            className="flex-grow border-t border-gray-200 h-8 cursor-pointer rounded hover:bg-[rgba(251,251,249,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border hover:border-black transition-all duration-200"
            onClick={() => handleTimeClick(hour)}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default DayView;