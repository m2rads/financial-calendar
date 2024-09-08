'use client';

import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';

const Calendar: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const handleTimeClick = (hour: number) => {
    const formattedHour = hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
    setSelectedTime(formattedHour);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    console.log('Saving:', { eventTitle, amount, selectedTime });
    setIsDialogOpen(false);
  };

  const goToPreviousDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date(2023, 0, 1, hour, minute);
        options.push(format(time, 'h:mm a'));
      }
    }
    return options;
  };

  return (
    <div className="max-w-sm mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        currentView={currentView}
        setCurrentView={setCurrentView}
        goToPreviousDay={goToPreviousDay}
        goToNextDay={goToNextDay}
        setIsDialogOpen={setIsDialogOpen}
      />

      <DayView handleTimeClick={handleTimeClick} />

      {/* Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent className="w-80 max-w-full p-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">Add Transaction</DialogTitle>
            <DialogClose onClick={() => setIsDialogOpen(false)} />
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventTitle" className="mb-1 block">Title</Label>
                <input
                  id="eventTitle"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-1 block">Amount</Label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                />
              </div>
              <div>
                <Label htmlFor="time" className="mb-1 block">Time</Label>
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="mt-6 flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)} variant="default">Cancel</Button>
            <Button onClick={handleSave} textColor='white' className='bg-[rgba(220,52,30,1)]' variant="default">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;