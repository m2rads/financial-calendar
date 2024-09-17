import React from 'react';

interface OutlineChevronLeftProps {
  className?: string;
}

const OutlineChevronLeft: React.FC<OutlineChevronLeftProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15 19.0002L8 12.0002L15 5.00024" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default OutlineChevronLeft;