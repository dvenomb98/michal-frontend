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
	return href ? (
		<Link href={href}>
			<button
				onMouseEnter={mouseEnter && mouseEnter}
				disabled={disabled}
				className={classNames(
					'bg-primary-blue p-3 px-6 w-full text-primary-white rounded-sm flex items-center justify-center whitespace-nowrap hoverButton',

					customStyles,
				)}
			>
				{loading ? <Loader /> : children}
			</button>
		</Link>
	) : (
		<button
			disabled={disabled}
			onClick={onClick && onClick}
			type={isSubmit ? 'submit' : 'button'}
			className={classNames(
				'bg-primary-blue p-3 px-6 w-full text-primary-white rounded-sm flex items-center justify-center whitespace-nowrap hoverButton',

				customStyles,
			)}
		>
			{loading ? <Loader /> : children}
		</button>
	);
};

export default Button;
