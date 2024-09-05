import React from 'react';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      <main className="container mx-auto px-4">
        <Calendar />
      </main>
    </div>
  );
}