import React, { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = ['AM', 'PM'];

  const handleSelect = (hour: string, minute: string, period: string) => {
    const formattedTime = `${hour}:${minute} ${period}`;
    onChange(formattedTime);
    // Removed setIsOpen(false) to keep the popover open
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          value={value || 'Select time'}
          readOnly
          className="w-full text-center h-10 cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0" side="bottom" align="start">
        <div className="flex h-[150px]">
          <div className="flex-1 pl-2 pr-2 overflow-y-auto scrollbar-hide">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant="default"
                className={`w-full h-6 mb-1 text-center text-xs ${selectedHour === hour ? 'bg-black text-white' : 'text-black'} hover:text-black`}
                onClick={() => {
                  setSelectedHour(hour);
                  handleSelect(hour, selectedMinute, selectedPeriod);
                }}
              >
                {hour}
              </Button>
            ))}
          </div>
          <div className="flex-1 pr-2 overflow-y-auto scrollbar-hide">
            {minutes.map((minute) => (
              <Button
                key={minute}
                variant="default"
                className={`w-full h-6 mb-1 text-center text-xs ${selectedMinute === minute ? 'bg-black text-white' : ''} hover:text-black`}
                onClick={() => {
                  setSelectedMinute(minute);
                  handleSelect(selectedHour, minute, selectedPeriod);
                }}
              >
                {minute}
              </Button>
            ))}
          </div>
          <div className="flex-1 pr-2">
            {periods.map((period) => (
              <Button
                key={period}
                variant="default"
                className={`w-full h-6 mb-1 text-center text-xs ${selectedPeriod === period ? 'bg-black text-white' : ''} hover:text-black`}
                onClick={() => {
                  setSelectedPeriod(period);
                  handleSelect(selectedHour, selectedMinute, period);
                }}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  return <CustomTimePicker value={value} onChange={onChange} />;
};

export default TimeInput;