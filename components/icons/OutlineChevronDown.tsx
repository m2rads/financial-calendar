import React from 'react';

interface OutlineChevronDownProps {
  className?: string;
}

const OutlineChevronDown: React.FC<OutlineChevronDownProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19 9.00024L12 16.0002L5 9.00024" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default OutlineChevronDown;