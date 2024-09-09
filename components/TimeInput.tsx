import React from 'react';
import { Input } from './ui/input';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const sanitizeTimeInput = (input: string) => {
    const [hours, minutes] = input.split(':').map(Number);
    const sanitizedHours = Math.min(Math.max(hours, 0), 23);
    const sanitizedMinutes = Math.min(Math.max(minutes, 0), 59);
    return `${sanitizedHours.toString().padStart(2, '0')}:${sanitizedMinutes.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeTimeInput(e.target.value);
    onChange(sanitizedValue);
  };

  return (
    <Input
      type="time"
      value={value}
      onChange={handleChange}
      className="w-full"
    />
  );
};

export default TimeInput;