import React from 'react';
import { Calendar } from "@/components/ui/calendar";

interface SidePanelProps {
  selectedDate: Date;
  onDateChange: (date: Date | undefined) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Calendar</h2>
        <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="rounded-md border"
        />
      {/* You can add more content to the side panel here */}
    </div>
  );
};

export default SidePanel;