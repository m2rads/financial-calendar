import React from 'react';

interface OutlineDotsHorizontalProps {
  className?: string;
}

const OutlineDotsHorizontal: React.FC<OutlineDotsHorizontalProps> = ({ className = '' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 12.0002H5.01M12 12.0002H12.01M19 12.0002H19.01M6 12.0002C6 12.5525 5.55228 13.0002 5 13.0002C4.44772 13.0002 4 12.5525 4 12.0002C4 11.448 4.44772 11.0002 5 11.0002C5.55228 11.0002 6 11.448 6 12.0002ZM13 12.0002C13 12.5525 12.5523 13.0002 12 13.0002C11.4477 13.0002 11 12.5525 11 12.0002C11 11.448 11.4477 11.0002 12 11.0002C12.5523 11.0002 13 11.448 13 12.0002ZM20 12.0002C20 12.5525 19.5523 13.0002 19 13.0002C18.4477 13.0002 18 12.5525 18 12.0002C18 11.448 18.4477 11.0002 19 11.0002C19.5523 11.0002 20 11.448 20 12.0002Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default OutlineDotsHorizontal;