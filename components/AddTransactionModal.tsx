import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar as CalendarPicker } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import TimeInput from './TimeInput';
import { format } from 'date-fns'; // Add this import

interface Event {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDate: Date | undefined;
  setEventDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  eventTitle: string;
  setEventTitle: (title: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  handleSave: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  eventDate,
  setEventDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  eventTitle,
  setEventTitle,
  amount,
  setAmount,
  handleSave,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent className="w-80 max-w-full p-4">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Add Transaction</DialogTitle>
          <DialogClose onClick={onClose} />
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
          <Button onClick={onClose} variant="default">Cancel</Button>
          <Button onClick={handleSave} className='bg-[rgba(220,52,30,1)]' textColor='white' variant="default">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;