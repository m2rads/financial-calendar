import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarHeader from './CalendarHeader';

describe('CalendarHeader', () => {
  const mockSetCurrentView = jest.fn();
  const mockGoToPreviousDay = jest.fn();
  const mockGoToNextDay = jest.fn();
  const mockSetIsDialogOpen = jest.fn();
  const mockGoToToday = jest.fn();

  const defaultProps = {
    currentDate: new Date('2023-05-15'),
    currentView: 'day',
    setCurrentView: mockSetCurrentView,
    goToPreviousDay: mockGoToPreviousDay,
    goToNextDay: mockGoToNextDay,
    setIsDialogOpen: mockSetIsDialogOpen,
    goToToday: mockGoToToday,
  };

  it('renders correctly', () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
    expect(screen.getByTitle('Previous Day')).toBeInTheDocument();
    expect(screen.getByTitle('Next Day')).toBeInTheDocument();
    expect(screen.getByTitle('Go to Today')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  it('calls goToPreviousDay when previous button is clicked', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Previous Day'));
    expect(mockGoToPreviousDay).toHaveBeenCalledTimes(1);
  });

  it('calls goToNextDay when next button is clicked', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Next Day'));
    expect(mockGoToNextDay).toHaveBeenCalledTimes(1);
  });

  it('calls goToToday when today button is clicked', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Go to Today'));
    expect(mockGoToToday).toHaveBeenCalledTimes(1);
  });

  it('opens view dropdown when clicked', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Day'));
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('calls setCurrentView when a view is selected', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('Day'));
    fireEvent.click(screen.getByText('Week'));
    expect(mockSetCurrentView).toHaveBeenCalledWith('week');
  });

  it('calls setIsDialogOpen when add event button is clicked', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Add Event'));
    expect(mockSetIsDialogOpen).toHaveBeenCalledWith(true);
  });
});
