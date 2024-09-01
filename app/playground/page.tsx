'use client'

import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription, AlertProps } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function Playground() {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const handleButtonClick = (variant: 'success' | 'danger' | 'warning' | 'info', multiline: boolean = false) => {
    const newAlert: AlertProps = {
      variant,
      showCloseButton: true,
      multiline,
      duration: multiline ? undefined : 5000,
      children: (
        <>
          <AlertTitle>{`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}</AlertTitle>
          <AlertDescription>
            {multiline 
              ? `I'm a multiline alert message and a have buttons too! I provide detailed messages to help users understand what's going on and capture the attention of the user in an intrusive way. I can have links too!` 
              : `This is a ${variant} alert that will disappear in 5 seconds.`}
          </AlertDescription>
          {multiline && (
            <div className="flex flex-row justify-start items-start gap-2 w-full mt-3 pl-[26px]">
              <Button onClick={() => console.log('Action 1 clicked')} variant="default" size="default">
                Button
              </Button>
              <Button onClick={() => console.log('Action 2 clicked')} variant="default" size="default" className="bg-black text-white">
                Button
              </Button>
            </div>
          )}
        </>
      ),
      onClose: () => {
        setAlerts(currentAlerts => currentAlerts.filter(a => a !== newAlert));
      }
    };
    setAlerts(currentAlerts => [...currentAlerts, newAlert]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 w-full">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Alert Playground</h1>
        
        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Trigger Single-line Alerts</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleButtonClick('success')}>Show Success Alert</Button>
            <Button onClick={() => handleButtonClick('danger')}>Show Danger Alert</Button>
            <Button onClick={() => handleButtonClick('warning')}>Show Warning Alert</Button>
            <Button onClick={() => handleButtonClick('info')}>Show Info Alert</Button>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Trigger Multiline Alerts</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleButtonClick('success', true)}>Show Multiline Success</Button>
            <Button onClick={() => handleButtonClick('danger', true)}>Show Multiline Danger</Button>
            <Button onClick={() => handleButtonClick('warning', true)}>Show Multiline Warning</Button>
            <Button onClick={() => handleButtonClick('info', true)}>Show Multiline Info</Button>
          </div>
        </section>
      </div>

      <div className="fixed top-0 right-0 max-h-screen overflow-y-auto p-4 z-50 w-full max-w-[calc(100vw-32px)] sm:max-w-[538px]">
        {alerts.map((alert, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <Alert {...alert} />
          </div>
        ))}
      </div>
    </main>
  );
}