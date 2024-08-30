import React from 'react';
import Alerts from '@/components/Alerts';

export default function Playground() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Playground</h1>
      <div className="space-y-8">
        <Alerts />
        {/* Add more components here as they are created */}
      </div>
    </main>
  );
}