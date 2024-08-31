import React from 'react';

interface SaveIconProps {
  className?: string;
}

const SaveIcon: React.FC<SaveIconProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 7.00024C3 4.79124 4.791 3.00024 7 3.00024H9C9.55201 3.00024 10 3.44824 10 4.00024C10 4.55224 9.55201 5.00024 9 5.00024H7C5.895 5.00024 5 5.89524 5 7.00024V17.0002C5 18.1052 5.895 19.0002 7 19.0002H17C18.105 19.0002 19 18.1052 19 17.0002V7.00024C19 5.89524 18.105 5.00024 17 5.00024H15C13.895 5.00024 13 5.89524 13 7.00024L13 13.0002H16L12 17.0002L8 13.0002H11V7.00024C11 4.79124 12.791 3.00024 15 3.00024H17C19.209 3.00024 21 4.79124 21 7.00024V17.0002C21 19.2092 19.209 21.0002 17 21.0002H7C4.791 21.0002 3 19.2092 3 17.0002V7.00024Z" fill="currentColor"/>
    </svg>
  );
};

export default SaveIcon;