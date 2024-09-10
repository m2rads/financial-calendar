import React from 'react';

interface SolidMenuProps {
  className?: string;
}

const SolidMenu: React.FC<SolidMenuProps> = ({ className = '' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.59998 6.00029C3.59998 5.33755 4.13723 4.80029 4.79998 4.80029H19.2C19.8627 4.80029 20.4 5.33755 20.4 6.00029C20.4 6.66303 19.8627 7.20029 19.2 7.20029H4.79998C4.13723 7.20029 3.59998 6.66303 3.59998 6.00029Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.59998 12.0003C3.59998 11.3376 4.13723 10.8003 4.79998 10.8003H19.2C19.8627 10.8003 20.4 11.3376 20.4 12.0003C20.4 12.663 19.8627 13.2003 19.2 13.2003H4.79998C4.13723 13.2003 3.59998 12.663 3.59998 12.0003Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.59998 18.0003C3.59998 17.3376 4.13723 16.8003 4.79998 16.8003H19.2C19.8627 16.8003 20.4 17.3376 20.4 18.0003C20.4 18.663 19.8627 19.2003 19.2 19.2003H4.79998C4.13723 19.2003 3.59998 18.663 3.59998 18.0003Z" fill="currentColor"/>
    </svg>
  );
};

export default SolidMenu;