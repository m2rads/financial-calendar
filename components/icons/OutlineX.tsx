import React from 'react';

interface OutlineXProps {
  className?: string;
}

const OutlineX: React.FC<OutlineXProps> = ({ className = '' }) => {
  return (
    <svg 
      width="1em" 
      height="1em" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M6 18.0002L18 6.00024M6 6.00024L18 18.0002" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OutlineX;