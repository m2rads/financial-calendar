'use client'

import React, { useState, FormEvent } from 'react';
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
import { Pill, PillContent } from '@/components/ui/pill';
import { OutlineX } from "@/components/icons";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { RadioGroup, RadioGroupItem, RadioGroupLabel, RadioGroupDescription } from '@/components/ui/radio-group';
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
    toggle5: false,
    toggle6: false,
    toggle7: false,
  });
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    plan: '',
    paymentMethod: '',
  });

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

  const handleToggleChange = (name: string) => (checked: boolean) => {
    setToggleStates(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioButtonClick = (name: string) => () => {
    setSelectedRadio(name);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to a server
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
            <Pill variant="rounded" className="bg-black text-white border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]">
              <PillContent variant="rounded">Dismiss</PillContent>
              <OutlineX className="w-3 h-3" />
            </Pill>
            <Pill variant="small" className="bg-black text-white border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] w-[68px]">
              <PillContent variant="small">Dismiss</PillContent>
              <OutlineX className="w-3 h-3" />
            </Pill>
            <Pill variant="rounded" className="bg-blue-500 text-white border-blue-500 hover:shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]">
              <PillContent variant="rounded">Custom</PillContent>
            </Pill>
            <Pill variant="small" className="bg-green-500 text-white border-green-500 hover:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]">
              <PillContent variant="small">Small</PillContent>
            </Pill>
            <Pill variant="rounded" className="bg-purple-500 text-white border-purple-500">
              <PillContent variant="rounded">Longer Small Pill</PillContent>
            </Pill>
            <Pill variant="small" className="bg-orange-500 text-white border-orange-500">
              <PillContent variant="small">XS</PillContent>
            </Pill>
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
            <div className="flex items-center space-x-2">
              <Toggle
                checked={toggleStates.toggle1}
                onChange={(checked) => handleToggleChange('toggle1')(checked)}
              />
              <Label htmlFor="toggle1">Default Toggle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Toggle
                checked={toggleStates.toggle2}
                onChange={(checked) => handleToggleChange('toggle2')(checked)}
                activeColor="#4CAF50"
                inactiveColor="#FFA000"
                toggleColor="#2196F3"
              />
              <Label htmlFor="toggle2">Custom Colors Toggle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Toggle
                disabled
                checked={toggleStates.toggle3}
                onChange={(checked) => handleToggleChange('toggle3')(checked)}
              />
              <Label htmlFor="toggle3">Disabled Unchecked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Toggle
                disabled
                checked={toggleStates.toggle4}
                onChange={(checked) => handleToggleChange('toggle4')(checked)}
              />
              <Label htmlFor="toggle4">Disabled Checked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="toggle5">Toggle with leading label</Label>
              <Toggle
                id="toggle5"
                checked={toggleStates.toggle5}
                onChange={(checked) => handleToggleChange('toggle5')(checked)}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Radio Button Card Component</h2>
          <RadioGroup value={selectedRadio || ''} onValueChange={setSelectedRadio}>
            <RadioGroupItem value="radio1" id="radio1">
              <div className="flex-shrink-0">
                <SaveIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow">
                <RadioGroupLabel htmlFor="radio1">Label</RadioGroupLabel>
                <RadioGroupDescription>Gravida tempor faucibus</RadioGroupDescription>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="radio2" id="radio2">
              <div className="flex-shrink-0">
                <SaveIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow">
                <RadioGroupLabel htmlFor="radio2">Label</RadioGroupLabel>
                <RadioGroupDescription>Gravida tempor faucibus</RadioGroupDescription>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="radio3" id="radio3">
              <div className="flex-shrink-0">
                <SaveIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow">
                <RadioGroupLabel htmlFor="radio3">Label</RadioGroupLabel>
                <RadioGroupDescription>Gravida tempor faucibus</RadioGroupDescription>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="radio4" id="radio4">
              <div className="flex-shrink-0">
                <SaveIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow">
                <RadioGroupLabel htmlFor="radio4">Label</RadioGroupLabel>
                <RadioGroupDescription>Gravida tempor faucibus</RadioGroupDescription>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="radio5" id="radio5">
              <div className="flex flex-col justify-start items-start flex-grow">
                <RadioGroupLabel htmlFor="radio5">Label</RadioGroupLabel>
                <RadioGroupDescription className="mt-2">Gravida tempor faucibus ipsum tristique aliquam amet sed ultrices bibendum.</RadioGroupDescription>
                <div className="mt-2 px-2 py-1 bg-gray-200 rounded-full text-sm">$222</div>
              </div>
            </RadioGroupItem>
          </RadioGroup>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold">Radio Button Card Component in a Form</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select a Plan</h3>
              <RadioGroup 
                value={formData.plan} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
              >
                <RadioGroupItem value="basic" id="basic">
                  <div className="flex-shrink-0">
                    <SaveIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col justify-start items-start flex-grow">
                    <RadioGroupLabel htmlFor="basic">Basic Plan</RadioGroupLabel>
                    <RadioGroupDescription>$9.99/month - Good for starters</RadioGroupDescription>
                  </div>
                </RadioGroupItem>
                <RadioGroupItem value="pro" id="pro">
                  <div className="flex-shrink-0">
                    <SaveIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col justify-start items-start flex-grow">
                    <RadioGroupLabel htmlFor="pro">Pro Plan</RadioGroupLabel>
                    <RadioGroupDescription>$19.99/month - For power users</RadioGroupDescription>
                  </div>
                </RadioGroupItem>
                <RadioGroupItem value="enterprise" id="enterprise">
                  <div className="flex-shrink-0">
                    <SaveIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col justify-start items-start flex-grow">
                    <RadioGroupLabel htmlFor="enterprise">Enterprise Plan</RadioGroupLabel>
                    <RadioGroupDescription>$49.99/month - Full featured for large teams</RadioGroupDescription>
                  </div>
                </RadioGroupItem>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <RadioGroupItem value="credit" id="credit">
                  <RadioGroupLabel htmlFor="credit">Credit Card</RadioGroupLabel>
                </RadioGroupItem>
                <RadioGroupItem value="paypal" id="paypal">
                  <RadioGroupLabel htmlFor="paypal">PayPal</RadioGroupLabel>
                </RadioGroupItem>
                <RadioGroupItem value="bank" id="bank">
                  <RadioGroupLabel htmlFor="bank">Bank Transfer</RadioGroupLabel>
                </RadioGroupItem>
              </RadioGroup>
            </div>

            <Button type="submit">Submit Form</Button>
          </form>
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