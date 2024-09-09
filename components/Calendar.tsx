'use client';

import React, { useState } from 'react';
import { format, addDays, subDays, isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import TimeInput from './TimeInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar as CalendarPicker } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Event {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

const Calendar: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [eventTitle, setEventTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [events, setEvents] = useState<Event[]>([]);

  const handleTimeClick = (hour: number) => {
    setStartTime(format(new Date().setHours(hour, 0), 'HH:mm'));
    setEndTime(format(new Date().setHours(hour + 1, 0), 'HH:mm'));
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!eventDate || !startTime || !endTime) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDate = new Date(eventDate);
    startDate.setHours(startHour, startMinute);

    const endDate = new Date(eventDate);
    endDate.setHours(endHour, endMinute);

    // Handle events spanning to the next day
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventTitle,
      amount: parseFloat(amount),
      startDate,
      endDate,
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsDialogOpen(false);
    // Reset form fields
    setEventTitle('');
    setAmount('');
    setStartTime('09:00');
    setEndTime('10:00');
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.startDate, date) || 
      isSameDay(event.endDate, date) ||
      (event.startDate < startOfDay(date) && event.endDate > endOfDay(date))
    );
  };

  const goToPreviousDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
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

      <DayView 
        handleTimeClick={handleTimeClick} 
        currentDate={currentDate}
        events={getEventsForDay(currentDate)}
      />

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
                <Input
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-1 block">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="date" className="mb-1 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      id="date"
                      value={eventDate ? format(eventDate, 'PPP') : ''}
                      className="w-full cursor-pointer"
                      readOnly
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarPicker
                      mode="single"
                      selected={eventDate}
                      onSelect={setEventDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="startTime" className="mb-1 block">Start Time</Label>
                  <TimeInput value={startTime} onChange={setStartTime} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="endTime" className="mb-1 block">End Time</Label>
                  <TimeInput value={endTime} onChange={setEndTime} />
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="mt-6 flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)} variant="default">Cancel</Button>
            <Button onClick={handleSave} className='bg-[rgba(220,52,30,1)]' textColor='white' variant="default">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;