import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  customStyles?: string;
}

const Container: React.FC<ContainerProps> = ({ children, customStyles }) => {
  return (
    <div className={`container mx-auto px-5 xl:px-32 py-24 ${customStyles && customStyles}`}>
      {children}
    </div>
  );
};

export default Container;
