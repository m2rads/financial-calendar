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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const resetModalState = () => {
    setEventDate(new Date());
    setStartTime('09:00');
    setEndTime('10:00');
    setEventTitle('');
    setAmount('');
    setSelectedEvent(null);
  };

  const handleTimeClick = (hour: number) => {
    resetModalState();
    setEventDate(currentDate);
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

    const updatedEvent: Event = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: eventTitle,
      amount: parseFloat(amount),
      startDate,
      endDate,
    };

    setEvents(prevEvents => {
      if (selectedEvent) {
        return prevEvents.map(ev => ev.id === selectedEvent.id ? updatedEvent : ev);
      } else {
        return [...prevEvents, updatedEvent];
      }
    });

    setIsDialogOpen(false);
    resetModalState();
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

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setEventDate(event.startDate);
    setStartTime(format(event.startDate, 'HH:mm'));
    setEventTitle(event.title);
    setAmount(event.amount.toString());
    setIsDialogOpen(true);
  };

  return (
    <div className="mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        currentView={currentView}
        setCurrentView={setCurrentView}
        goToPreviousDay={goToPreviousDay}
        goToNextDay={goToNextDay}
        setIsDialogOpen={() => {
          resetModalState();
          setIsDialogOpen(true);
        }}
      />

      <DayView 
        handleTimeClick={handleTimeClick} 
        handleEventClick={handleEventClick}
        currentDate={currentDate}
        events={getEventsForDay(currentDate)}
      />

      <AddTransactionModal
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          resetModalState();
        }}
        eventDate={eventDate}
        setEventDate={setEventDate}
        startTime={startTime}
        setStartTime={setStartTime}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        amount={amount}
        setAmount={setAmount}
        handleSave={handleSave}
        isEditing={!!selectedEvent}
      />
    </div>
  );
};

export default Calendar;