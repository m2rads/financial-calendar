import React from 'react';

interface SolidExclamationCircleProps {
  className?: string;
}

const SolidExclamationCircle: React.FC<SolidExclamationCircleProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.6 12.0003C21.6 17.3022 17.302 21.6003 12 21.6003C6.69809 21.6003 2.40002 17.3022 2.40002 12.0003C2.40002 6.69834 6.69809 2.40027 12 2.40027C17.302 2.40027 21.6 6.69834 21.6 12.0003ZM13.2 16.8003C13.2 17.463 12.6628 18.0003 12 18.0003C11.3373 18.0003 10.8 17.463 10.8 16.8003C10.8 16.1375 11.3373 15.6003 12 15.6003C12.6628 15.6003 13.2 16.1375 13.2 16.8003ZM12 6.00027C11.3373 6.00027 10.8 6.53753 10.8 7.20027V12.0003C10.8 12.663 11.3373 13.2003 12 13.2003C12.6628 13.2003 13.2 12.663 13.2 12.0003V7.20027C13.2 6.53753 12.6628 6.00027 12 6.00027Z" fill="currentColor"/>
    </svg>
  );
};

export default SolidExclamationCircle;