import classNames from 'classnames';
import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
  customStyles?: string;
  secondaryStyles?: boolean;
}

const Background: React.FC<BackgroundProps> = ({
	children,
	customStyles,
	secondaryStyles = false,
}) => {
	return (
		<div
			className={classNames(
				secondaryStyles ? 'bg-secondary-white' : 'bg-primary-white',
				customStyles,
			)}
		>
			{children}
		</div>
	);
};

export default Background;
