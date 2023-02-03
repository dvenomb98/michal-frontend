import classNames from 'classnames';
import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
  customStyles?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, customStyles }) => {
  return <div className={classNames('bg-primary-white', customStyles)}>{children}</div>;
};

export default Background;
