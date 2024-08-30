import React from 'react';

interface CheckCircleFillProps {
  className?: string;
  width?: number;
  height?: number;
}

const CheckCircleFill: React.FC<CheckCircleFillProps> = ({ 
  className = '', 
  width = 24, 
  height = 24 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12.0142 1.99896C6.49116 1.99896 2.01416 6.47596 2.01416 11.9989C2.01416 17.5219 6.49116 21.9989 12.0142 21.9989C17.5372 21.9989 22.0142 17.5219 22.0142 11.9989C22.0142 6.47596 17.5372 1.99896 12.0142 1.99896ZM16.0142 8.99895C16.2702 8.99895 16.5372 9.08496 16.7332 9.27996C17.1232 9.67096 17.1232 10.3269 16.7332 10.7179L12.9832 14.4369C11.8322 15.5869 10.0732 15.415 9.17017 14.061L8.17017 12.561C7.86417 12.102 7.99215 11.462 8.45215 11.155C8.91115 10.849 9.55115 10.9769 9.85815 11.4369L10.8582 12.9369C11.0602 13.2399 11.3192 13.288 11.5762 13.03L15.2952 9.27996C15.4912 9.08496 15.7582 8.99895 16.0142 8.99895Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckCircleFill;