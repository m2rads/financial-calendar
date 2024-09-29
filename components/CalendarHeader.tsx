import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { OutlineChevronLeft, OutlineChevronRight, Calendar2PlusFill, OutlineChevronDown, Calendar2Fill } from './icons';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  currentView: 'day' | 'week' | 'month' | 'year';
  setCurrentView: React.Dispatch<React.SetStateAction<'day' | 'week' | 'month' | 'year'>>;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goToToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  currentView,
  setCurrentView,
  goToPreviousDay,
  goToNextDay,
  setIsDialogOpen,
  goToToday
}) => {
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

  const handleViewChange = (view: 'day' | 'week' | 'month' | 'year') => {
    setCurrentView(view);
    setIsViewDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 bg-[#FBFBF9] z-50 p-4 flex items-center justify-between mb-4">
      <div className="flex items-center flex-grow md:flex-grow-0 md:space-x-4">
        <Button
          variant="default"
          size="icon"
          onClick={goToPreviousDay}
          className="w-8 h-8 p-0"
        >
          <OutlineChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-bold flex-grow text-center mx-2 md:mx-0 md:flex-grow-0">
          {format(currentDate, 'MMM d, yyyy')}
        </h1>
        <Button
          variant="default"
          size="icon"
          onClick={goToNextDay}
          className="w-8 h-8 p-0"
        >
          <OutlineChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={goToToday}
          className="w-8 h-8 p-0 ml-2"
          title="Go to Today"
        >
          <Calendar2Fill className="w-4 h-4" />
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
  );
};

export default CalendarHeader;