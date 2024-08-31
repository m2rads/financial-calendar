'use client'

import React from 'react';
import { Alert, AlertTitle, AlertDescription, AlertActions } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

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
      
      {/* Alerts Section */}
      <section className="space-y-8 mb-12">
        <h2 className="text-3xl font-semibold mb-4">Alerts</h2>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Success Alert</h3>
          <Alert variant="success" showCloseButton onClose={handleClose}>
            <AlertTitle>Success message</AlertTitle>
          </Alert>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Danger Alert</h3>
          <Alert variant="danger" showCloseButton onClose={handleClose}>
            <AlertTitle>Danger message</AlertTitle>
          </Alert>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Warning Alert</h3>
          <Alert variant="warning" showCloseButton onClose={handleClose}>
            <AlertTitle>Warning message</AlertTitle>
          </Alert>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Info Alert</h3>
          <Alert variant="info" showCloseButton onClose={handleClose}>
            <AlertTitle>Info message</AlertTitle>
          </Alert>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Multi-line Alert with Buttons</h3>
          <Alert variant="success">
            <AlertDescription>
              I'm a multiline alert message and a have buttons too! I provide
              detailed messages to help users understand what's going on and
              capture the attention of the user in an intrusive way. I can have
              links too!
            </AlertDescription>
            <AlertActions>
              <Button onClick={() => handleButtonClick("Button 1")}>
                Button
              </Button>
              <Button onClick={() => handleButtonClick("Button 2")} className="bg-black text-white">
                Button
              </Button>
            </AlertActions>
          </Alert>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold mb-4">Buttons</h2>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Default Buttons</h3>
          <p className="text-sm text-gray-600 mb-2">Click the buttons to see the press effect!</p>
          <div className="flex space-x-4">
            <Button>Default (hover & click me)</Button>
            <Button variant="disabled">Disabled</Button>
            <Button variant="hover">Always Hover Style</Button>
            <Button backgroundColor="#FF90E8">Custom Color</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Buttons with Icons</h3>
          <div className="flex space-x-4">
            <Button leftIcon="save">Left Icon</Button>
            <Button rightIcon="search">Right Icon</Button>
            <Button leftIcon="save" rightIcon="eye">Both Icons</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Icon-only Buttons</h3>
          <div className="flex space-x-4">
            <Button iconOnly="save" />
            <Button iconOnly="search" />
            <Button iconOnly="eye" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Variant Buttons with Icons</h3>
          <div className="flex space-x-4">
            <Button variant="disabled" leftIcon="save">Disabled (30% opacity)</Button>
            <Button variant="hover" rightIcon="search">Hover (with shadow)</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Custom Color Buttons</h3>
          <div className="flex space-x-4">
            <Button backgroundColor="#FF90E8">Pink Button</Button>
            <Button backgroundColor="#FF90E8" leftIcon="save">Pink with Icon</Button>
            <Button backgroundColor="#FF90E8" iconOnly="eye" />
          </div>
        </div>
      </section>
    </main>
  );
}