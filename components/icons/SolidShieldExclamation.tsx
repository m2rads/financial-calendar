import React from 'react';

interface SolidShieldExclamationProps {
  className?: string;
}

const SolidShieldExclamation: React.FC<SolidShieldExclamationProps> = ({ className = '' }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.33362C9.49836 4.57267 6.20927 5.94998 2.59935 5.99896C2.46826 6.77988 2.40002 7.58213 2.40002 8.40031C2.40002 14.6701 6.4071 20.0041 12 21.9809C17.5929 20.0041 21.6 14.6701 21.6 8.40031C21.6 7.58212 21.5318 6.77988 21.4007 5.99896C17.7908 5.94998 14.5017 4.57267 12 2.33362ZM13.2 16.8003C13.2 17.463 12.6628 18.0003 12 18.0003C11.3373 18.0003 10.8 17.463 10.8 16.8003C10.8 16.1375 11.3373 15.6003 12 15.6003C12.6628 15.6003 13.2 16.1375 13.2 16.8003ZM13.2 8.40027C13.2 7.73753 12.6628 7.20027 12 7.20027C11.3373 7.20027 10.8 7.73753 10.8 8.40027V12.0003C10.8 12.663 11.3373 13.2003 12 13.2003C12.6628 13.2003 13.2 12.663 13.2 12.0003V8.40027Z" fill="currentColor"/>
    </svg>
  );
};

export default SolidShieldExclamation;