import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date(2023, 0, 1, hour, minute);
        options.push(format(time, 'HH:mm'));
      }
    }
    return options;
  };

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <div className="flex flex-col p-2 max-h-60 overflow-y-auto">
          {generateTimeOptions().map((time) => (
            <Button
              key={time}
              variant="default"
              onClick={() => handleTimeSelect(time)}
              className="text-sm m-1 px-3 py-2"
            >
              {time}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeInput;