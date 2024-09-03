'use client'

import React, { useState } from 'react';
import { Alert, AlertDescription, AlertClose } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Pill } from '@/components/ui/pill';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { RadioButtonCard } from '@/components/ui/radioButtonCard';
import { SaveIcon, CheckCircleFill, SolidXCircle, SolidShieldExclamation, SolidExclamationCircle } from '@/components/icons';
import { cn } from '@/lib/utils';

const alertVariants = {
  success: {
    className: "bg-[rgba(211,243,240,1)] border-[#23A094]",
    icon: <CheckCircleFill className="text-[#23A094]" />,
  },
  danger: {
    className: "bg-[rgba(248,214,210,1)] border-[#DC341E]",
    icon: <SolidXCircle className="text-[#DC341E]" />,
  },
  warning: {
    className: "bg-[rgba(253,244,208,1)] border-[#FFC900]",
    icon: <SolidShieldExclamation className="text-[#FFC900]" />,
  },
  info: {
    className: "bg-[rgba(233,238,250,1)] border-[#90A8ED]",
    icon: <SolidExclamationCircle className="text-[#90A8ED]" />,
  },
};

export default function Playground() {
  const [alerts, setAlerts] = useState<React.ReactNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'horizontal' | 'vertical'>('horizontal');
  const [toggleStates, setToggleStates] = useState({
    toggle1: false,
    toggle2: true,
    toggle3: false,
    toggle4: true,
  });
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const handleButtonClick = (variant: keyof typeof alertVariants) => {
    const newAlert = (
      <Alert key={Date.now()} className={alertVariants[variant].className}>
        {alertVariants[variant].icon}
        <AlertDescription>
          This is a {variant} alert that will disappear in 5 seconds.
        </AlertDescription>
        <AlertClose onClick={() => setAlerts(currentAlerts => currentAlerts.filter(a => a !== newAlert))} />
      </Alert>
    );
    setAlerts(currentAlerts => [...currentAlerts, newAlert]);
    setTimeout(() => {
      setAlerts(currentAlerts => currentAlerts.filter(a => a !== newAlert));
    }, 5000);
  };

  const openModal = (variant: 'horizontal' | 'vertical') => {
    setModalVariant(variant);
    setIsModalOpen(true);
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
          <h2 className="text-2xl font-semibold">Trigger Alerts</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleButtonClick('success')}>Show Success Alert</Button>
            <Button onClick={() => handleButtonClick('danger')}>Show Danger Alert</Button>
            <Button onClick={() => handleButtonClick('warning')}>Show Warning Alert</Button>
            <Button onClick={() => handleButtonClick('info')}>Show Info Alert</Button>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Tooltip Component</h2>
          <div className="flex flex-wrap gap-8">
            <Tooltip content="This is a top tooltip" position="top">
              <Button>Hover for top tooltip</Button>
            </Tooltip>
            <Tooltip content="This is a bottom tooltip" position="bottom">
              <Button>Hover for bottom tooltip</Button>
            </Tooltip>
            <Tooltip content="This is a left tooltip" position="left">
              <Button>Hover for left tooltip</Button>
            </Tooltip>
            <Tooltip content="This is a right tooltip" position="right">
              <Button>Hover for right tooltip</Button>
            </Tooltip>
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
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox1" 
                onChange={(checked) => console.log('Checkbox 1:', checked)}
              />
              <Label htmlFor="checkbox1">Default Checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox2" 
                selectedColor="#FF90E8"
                onChange={(checked) => console.log('Checkbox 2:', checked)}
              />
              <Label htmlFor="checkbox2">Custom Color Checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox3" 
                disabled 
                onChange={(checked) => console.log('Checkbox 3:', checked)}
              />
              <Label htmlFor="checkbox3">Disabled Unchecked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox4" 
                disabled 
                defaultChecked
                selectedColor="#FF90E8" 
                onChange={(checked) => console.log('Checkbox 4:', checked)}
              />
              <Label htmlFor="checkbox4">Disabled Checked</Label>
            </div>
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

        <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} variant={modalVariant}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete page?</DialogTitle>
              <DialogClose onClick={() => setIsModalOpen(false)} />
            </DialogHeader>
            <DialogDescription className="mb-6">
              Are you sure you want to delete the page 'What's inside'? Existing customers will lose access to this content. This action cannot be undone.
            </DialogDescription>
            <DialogFooter variant={modalVariant}>
              <Button
                onClick={() => {
                  console.log('Confirmed');
                  setIsModalOpen(false);
                }}
                className={cn(
                  "bg-[rgba(220,52,30,1)]",
                  modalVariant === "vertical" && "w-full"
                )}
                textColor="white"
              >
                Yes, delete
              </Button>
              <Button
                onClick={() => {
                  console.log('Cancelled');
                  setIsModalOpen(false);
                }}
                variant="default"
                className={cn(modalVariant === "vertical" && "w-full")}
              >
                No, cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="fixed top-0 right-0 max-h-screen overflow-y-auto p-4 z-50 w-full max-w-[calc(100vw-32px)] sm:max-w-[538px]">
        {alerts}
      </div>
    </main>
  );
}