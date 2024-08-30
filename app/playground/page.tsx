'use client'

import React from 'react';
import { Alert, AlertTitle, AlertDescription, AlertActions } from '@/components/ui/alert';
import { CheckCircleFill } from "@/components/icons";

export default function Playground() {
  const handleClose = () => {
    console.log("Alert closed");
  };

  const handleButtonClick = (buttonText: string) => {
    console.log(`${buttonText} clicked`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Playground</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Single-line Alert</h2>
          <Alert icon={<CheckCircleFill />} onClose={handleClose}>
            <AlertTitle>I'm a single alert message.</AlertTitle>
          </Alert>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Multi-line Alert with Buttons</h2>
          <Alert icon={<CheckCircleFill />}>
            <AlertDescription>
              I'm a multiline alert message and a have buttons too! I provide
              detailed messages to help users understand what's going on and
              capture the attention of the user in an intrusive way. I can have
              links too!
            </AlertDescription>
            <AlertActions>
              <button 
                onClick={() => handleButtonClick("Button 1")}
                className="flex justify-center items-center p-1.5 border border-black rounded text-xs font-mabry-pro leading-[120%]"
              >
                Button
              </button>
              <button 
                onClick={() => handleButtonClick("Button 2")}
                className="flex justify-center items-center p-1.5 border border-black rounded text-xs font-mabry-pro leading-[120%] bg-black text-white"
              >
                Button
              </button>
            </AlertActions>
          </Alert>
        </div>
      </div>
    </main>
  );
}