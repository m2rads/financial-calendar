'use client'

import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription, AlertProps } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Hover } from '@/components/ui/hover';
import { Modal } from '@/components/ui/modal';
import { Pill } from '@/components/ui/pill';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { RadioButtonCard } from '@/components/ui/radioButtonCard';
import { SaveIcon } from '@/components/icons';

export default function Playground() {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'horizontal' | 'vertical'>('horizontal');
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: true,
    checkbox3: false,
    checkbox4: true,
  });
  const [toggleStates, setToggleStates] = useState({
    toggle1: false,
    toggle2: true,
    toggle3: false,
    toggle4: true,
  });
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

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

  const openModal = (variant: 'horizontal' | 'vertical') => {
    setModalVariant(variant);
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates(prev => ({ ...prev, [name]: event.target.checked }));
  };

  const handleToggleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates(prev => ({ ...prev, [name]: event.target.checked }));
  };

  const handleRadioButtonClick = (name: string) => () => {
    setSelectedRadio(name);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 w-full">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Component Playground</h1>
        
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

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Hover Component</h2>
          <div className="space-y-2">
            <Hover content="This is a hover tooltip">
              <span className="cursor-pointer underline">Hover over me</span>
            </Hover>
          </div>
          <div className="space-y-2">
            <Hover content="3,507 views">
              <Button variant="default">Hover for stats</Button>
            </Hover>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Modal Component</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => openModal('horizontal')}>Open Horizontal Modal</Button>
            <Button onClick={() => openModal('vertical')}>Open Vertical Modal</Button>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Button Component</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button
              backgroundColor="rgba(220,52,30,1)"
              textColor="white"
              hoverBackgroundColor="rgba(251,251,249,1)"
              hoverTextColor="rgba(220,52,30,1)"
            >
              Custom Color Button
            </Button>
            <Button
              backgroundColor="blue"
              textColor="white"
              hoverBackgroundColor="rgba(251,251,249,1)"
              hoverTextColor="blue"
            >
              Blue Button
            </Button>
            <Button variant="hover">Hover Button</Button>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Pill Component</h2>
          <div className="flex flex-wrap gap-4">
            <Pill text="Dismiss" size="regular" icon={true} hoverEffect={true} />
            <Pill text="Custom" size="regular" backgroundColor="blue" textColor="white" borderColor="blue" hoverEffect={true} />
            <Pill text="Small" size="small" hoverEffect={true} />
            <Pill text="Green" size="small" backgroundColor="green" textColor="white" borderColor="green" hoverEffect={true} />
            <Pill text="Longer Small Pill" size="small" backgroundColor="purple" textColor="white" borderColor="purple" />
            <Pill text="XS" size="small" backgroundColor="orange" textColor="white" borderColor="orange" />
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Checkbox Component</h2>
          <div className="flex flex-col gap-4">
            <Checkbox
              label="Default Checkbox"
              checked={checkboxStates.checkbox1}
              onChange={handleCheckboxChange('checkbox1')}
            />
            <Checkbox
              label="Custom Color Checkbox"
              checked={checkboxStates.checkbox2}
              onChange={handleCheckboxChange('checkbox2')}
              selectedColor="#FF90E8"
            />
            <Checkbox
              label="Disabled Unchecked"
              disabled
              checked={checkboxStates.checkbox3}
              onChange={handleCheckboxChange('checkbox3')}
            />
            <Checkbox
              label="Disabled Checked (Custom Color)"
              disabled
              checked={checkboxStates.checkbox4}
              onChange={handleCheckboxChange('checkbox4')}
              selectedColor="#FF90E8"
            />
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Toggle Component</h2>
          <div className="flex flex-col gap-4">
            <Toggle
              label="Default Toggle"
              checked={toggleStates.toggle1}
              onChange={handleToggleChange('toggle1')}
            />
            <Toggle
              label="Custom Colors Toggle"
              checked={toggleStates.toggle2}
              onChange={handleToggleChange('toggle2')}
              activeColor="#4CAF50"
              inactiveColor="#FFA000"
              toggleColor="#2196F3"
            />
            <Toggle
              label="Disabled Unchecked"
              disabled
              checked={toggleStates.toggle3}
              onChange={handleToggleChange('toggle3')}
            />
            <Toggle
              label="Disabled Checked"
              disabled
              checked={toggleStates.toggle4}
              onChange={handleToggleChange('toggle4')}
            />
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Radio Button Card Component</h2>
          <div className="flex flex-col gap-4">
            <RadioButtonCard
              title="Label"
              description="Gravida tempor faucibus"
              icon={<SaveIcon />}
              selected={selectedRadio === 'radio1'}
              onClick={handleRadioButtonClick('radio1')}
            />
            <RadioButtonCard
              title="Label"
              description="Gravida tempor faucibus"
              icon={<SaveIcon />}
              selected={selectedRadio === 'radio2'}
              onClick={handleRadioButtonClick('radio2')}
            />
            <RadioButtonCard
              title="Label"
              description="Gravida tempor faucibus"
              icon={<SaveIcon />}
              selected={selectedRadio === 'radio3'}
              onClick={handleRadioButtonClick('radio3')}
            />
            <RadioButtonCard
              title="Label"
              description="Gravida tempor faucibus"
              icon={<SaveIcon />}
              selected={selectedRadio === 'radio4'}
              onClick={handleRadioButtonClick('radio4')}
            />
            <RadioButtonCard
              title="Label"
              description="Gravida tempor faucibus ipsum tristique aliquam amet sed ultrices bibendum."
              pillText="$222"
              orientation="vertical"
              selected={selectedRadio === 'radio5'}
              onClick={handleRadioButtonClick('radio5')}
            />
          </div>
        </section>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Delete page?"
          description="Are you sure you want to delete the page 'What's inside'? Existing customers will lose access to this content. This action cannot be undone."
          confirmText="Yes, delete"
          cancelText="No, cancel"
          onConfirm={() => {
            console.log('Confirmed');
            setIsModalOpen(false);
          }}
          onCancel={() => {
            console.log('Cancelled');
            setIsModalOpen(false);
          }}
          variant={modalVariant}
        />
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