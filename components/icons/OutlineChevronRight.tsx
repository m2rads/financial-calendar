import React from 'react';

interface OutlineChevronRightProps {
  className?: string;
}

const OutlineChevronRight: React.FC<OutlineChevronRightProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 5.00024L16 12.0002L9 19.0002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default OutlineChevronRight;