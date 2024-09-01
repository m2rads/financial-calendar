import React from 'react';

interface Check2Props {
  className?: string;
}

const Check2: React.FC<Check2Props> = ({ className = '' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19.018 5.99677C18.762 5.99677 18.495 6.08077 18.3 6.27277L9.59301 14.8668C9.33601 15.1198 9.07802 15.0728 8.87602 14.7748L5.88001 10.3548C5.57401 9.90376 4.93401 9.77776 4.47501 10.0788C4.01701 10.3798 3.88901 11.0088 4.19501 11.4598L7.19001 15.8798C8.09201 17.2088 9.84901 17.3778 10.998 16.2478L19.736 7.68475C20.125 7.30075 20.125 6.65677 19.736 6.27277C19.541 6.08077 19.273 5.99677 19.018 5.99677Z" fill="black"/>
    </svg>
  );
};

export default Check2;