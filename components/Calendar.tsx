'use client';

import React, { useState } from 'react';
import { format, addDays, subDays, isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import AddTransactionModal from './AddTransactionModal';

interface Event {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [eventTitle, setEventTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleTimeClick = (hour: number) => {
    setStartTime(format(new Date().setHours(hour, 0), 'HH:mm'));
    setEndTime(format(new Date().setHours(hour + 1, 0), 'HH:mm'));
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!eventDate || !startTime) return;

    const [hours, minutes] = startTime.split(':').map(Number);

    const startDate = new Date(eventDate);
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 25);

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
        setIsDialogOpen={setIsDialogOpen} // Add this prop
      />

      <DayView 
        handleTimeClick={handleTimeClick} 
        currentDate={currentDate}
        events={getEventsForDay(currentDate)}
      />

      <AddTransactionModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        eventDate={eventDate}
        setEventDate={setEventDate}
        startTime={startTime}
        setStartTime={setStartTime}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        amount={amount}
        setAmount={setAmount}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Calendar;