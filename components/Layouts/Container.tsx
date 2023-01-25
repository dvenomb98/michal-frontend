import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  customStyles?: string;
}

const Container: React.FC<ContainerProps> = ({ children, customStyles }) => {
	return (
		<div className={`container mx-auto px-5 lg:px-32 py-16 ${customStyles && customStyles}`}>
			{children}
		</div>
	);
};

export default Container;
