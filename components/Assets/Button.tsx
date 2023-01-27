import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import Loader from '../Assets/Loader';

interface ButtonProps {
  children: React.ReactNode;
  isSubmit?: boolean;
  loading?: boolean;
  onClick?: () => void;
  customStyles?: string;
  disabled?: boolean;
  href?: string;
  mouseEnter?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	isSubmit = false,
	loading = false,
	onClick,
	disabled = false,
	customStyles,
	href,
	mouseEnter,
}) => {
	const sharedClass = classNames(
		'bg-primary-blue text-primary-white hoverButton p-3 px-6 min-w-[300px] rounded-sm flex items-center justify-center whitespace-nowrap',
		customStyles,
	);

	return href ? (
		<Link href={href}>
			<button onMouseEnter={mouseEnter && mouseEnter} disabled={disabled} className={sharedClass}>
				{loading ? <Loader /> : children}
			</button>
		</Link>
	) : (
		<button
			disabled={disabled}
			onClick={onClick && onClick}
			type={isSubmit ? 'submit' : 'button'}
			className={sharedClass}
		>
			{loading ? <Loader /> : children}
		</button>
	);
};

export default Button;
