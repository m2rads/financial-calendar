'use client'

import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription, AlertActions, AlertProps, AlertGroup } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function Playground() {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const handleButtonClick = (variant: 'success' | 'danger' | 'warning' | 'info', multiline: boolean = false) => {
    const newAlert: AlertProps = {
      id: Date.now(),
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`,
      description: multiline 
        ? `This is a ${variant} multiline alert. It will not disappear automatically and has action buttons.` 
        : `This is a ${variant} alert that will disappear in 5 seconds.`,
      multiline,
      showCloseButton: true,
      onClose: () => handleCloseAlert(Date.now()),
    };
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  const handleCloseAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Alert Playground</h1>
      
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-semibold">Trigger Single-line Alerts</h2>
        <div className="flex space-x-4">
          <Button onClick={() => handleButtonClick('success')}>Show Success Alert</Button>
          <Button onClick={() => handleButtonClick('danger')}>Show Danger Alert</Button>
          <Button onClick={() => handleButtonClick('warning')}>Show Warning Alert</Button>
          <Button onClick={() => handleButtonClick('info')}>Show Info Alert</Button>
        </div>
      </section>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-semibold">Trigger Multiline Alerts</h2>
        <div className="flex space-x-4">
          <Button onClick={() => handleButtonClick('success', true)}>Show Multiline Success</Button>
          <Button onClick={() => handleButtonClick('danger', true)}>Show Multiline Danger</Button>
          <Button onClick={() => handleButtonClick('warning', true)}>Show Multiline Warning</Button>
          <Button onClick={() => handleButtonClick('info', true)}>Show Multiline Info</Button>
        </div>
      </section>

      <AlertGroup alerts={alerts.map(alert => ({
        ...alert,
        children: (
          <>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
            {alert.multiline && (
              <AlertActions>
                <Button onClick={() => console.log('Action 1 clicked')}>Action 1</Button>
                <Button onClick={() => console.log('Action 2 clicked')}>Action 2</Button>
              </AlertActions>
            )}
          </>
        )
      }))} />
    </main>
  );
}