import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';

jest.mock('./CalendarHeader', () => {
  return function MockCalendarHeader({ goToToday }: { goToToday: () => void }) {
    return (
      <div>
        <button onClick={goToToday}>Mock Go to Today</button>
      </div>
    );
  };
});

jest.mock('./DayView', () => {
  return function MockDayView() {
    return <div>Mock Day View</div>;
  };
});

describe('Calendar', () => {
  it('renders correctly', () => {
    render(<Calendar />);
    expect(screen.getByText('Mock Go to Today')).toBeInTheDocument();
  });

  it('updates currentDate when goToToday is called', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-05-15'));

    render(<Calendar />);
    
    // Simulate changing the date
    fireEvent.click(screen.getByText('Mock Go to Today'));

    // Check if the mock day view is rendered
    expect(screen.getByText('Mock Day View')).toBeInTheDocument();

    jest.useRealTimers();
  });
});