'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { OutlineChevronLeft, OutlineChevronRight, Calendar2PlusFill } from './icons';
import { format, addDays, subDays } from 'date-fns';

const Calendar: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [eventType, setEventType] = useState<'transaction' | 'event'>('transaction');
  const [eventTitle, setEventTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleTimeClick = (hour: number) => {
    const formattedHour = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
    setSelectedTime(formattedHour);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving:', { eventType, eventTitle, amount, selectedTime });
    setIsDialogOpen(false);
  };

  const goToPreviousDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-[#FBFBF9] z-10 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center flex-grow">
          <Button variant="default" size="icon" onClick={goToPreviousDay} className="w-8 h-8 p-0">
            <OutlineChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold flex-grow text-center">
            {format(currentDate, 'MMMM d, yyyy')}
          </h1>
          <Button variant="default" size="icon" onClick={goToNextDay} className="w-8 h-8 p-0">
            <OutlineChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button 
          variant="default" 
          size="icon" 
          onClick={() => setIsDialogOpen(true)} 
          className="w-8 h-8 p-0 ml-4"
        >
          <Calendar2PlusFill className="w-4 h-4" />
        </Button>
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
            <DialogTitle>Add {eventType === 'transaction' ? 'Transaction' : 'Event'}</DialogTitle>
            <DialogClose onClick={() => setIsDialogOpen(false)} />
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-6">
              <div>
                <Label htmlFor="eventType" className="mb-2 block">Type</Label>
                <RadioGroup value={eventType} onValueChange={(value) => setEventType(value as 'transaction' | 'event')}>
                  <RadioGroupItem value="transaction" id="transaction">
                    Transaction
                  </RadioGroupItem>
                  <RadioGroupItem value="event" id="event">
                    Event
                  </RadioGroupItem>
                </RadioGroup>
              </div>
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
              {eventType === 'transaction' && (
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
              )}
              <div>
                <Label htmlFor="time" className="mb-2 block">Time</Label>
                <input
                  id="time"
                  type="text"
                  value={selectedTime}
                  readOnly
                  className="w-full border border-black rounded px-2 py-1 bg-gray-100"
                />
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