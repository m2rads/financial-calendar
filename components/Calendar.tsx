'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { OutlineChevronLeft, OutlineChevronRight, Calendar2PlusFill, OutlineChevronDown } from './icons';
import { format, addDays, subDays } from 'date-fns';

const Calendar: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsViewDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleViewChange = (view: 'day' | 'week' | 'month' | 'year') => {
    setCurrentView(view);
    setIsViewDropdownOpen(false);
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-[#FBFBF9] z-10 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center flex-grow">
          <Button variant="default" size="icon" onClick={goToPreviousDay} className="w-8 h-8 p-0">
            <OutlineChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold flex-grow text-center mx-2">
            {format(currentDate, 'MMM d, yyyy')}
          </h1>
          <Button variant="default" size="icon" onClick={goToNextDay} className="w-8 h-8 p-0">
            <OutlineChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center ml-4">
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="default"
              onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
              className="flex items-center h-8 px-2 text-sm"
            >
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              <OutlineChevronDown className="w-3 h-3 ml-1" />
            </Button>
            {isViewDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-black rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
                {['day', 'week', 'month', 'year'].map((view) => (
                  <button
                    key={view}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => handleViewChange(view as 'day' | 'week' | 'month' | 'year')}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button 
            variant="default" 
            size="icon" 
            onClick={() => setIsDialogOpen(true)} 
            className="w-8 h-8 p-0 ml-2"
          >
            <Calendar2PlusFill className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Time slots */}
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

      {/* Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogClose onClick={() => setIsDialogOpen(false)} />
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-6">
              <div>
                <Label htmlFor="eventTitle" className="mb-2 block">Title</Label>
                <input
                  id="eventTitle"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-2 block">Amount</Label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                />
              </div>
              <div>
                <Label htmlFor="time" className="mb-2 block">Time</Label>
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-black rounded px-2 py-1"
                >
                  {hours.map((hour) => {
                    const formattedHour = hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
                    return (
                      <option key={hour} value={formattedHour}>
                        {formattedHour}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="mt-8">
            <Button onClick={() => setIsDialogOpen(false)} variant="default" className="mr-2">Cancel</Button>
            <Button onClick={handleSave} variant="default">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;