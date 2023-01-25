import Link from 'next/link';
import React from 'react';
import { navLinks, socialMedia } from '../../constants/shared';
import Container from '../Layouts/Container';

import { CheckBadgeIcon, InboxIcon, PhoneIcon } from '@heroicons/react/24/outline';

const boxClasses = 'flex flex-col gap-5 basis-1/3';
const headerClasses = 'font-semibold text-h2';
const listClasses = 'flex flex-col gap-2';

const Footer = () => {
	const iconClasses = 'w-8 h-8';

	const footerList = [
		{
			value: 'info@perspective-video.cz',
			icon: <InboxIcon className={iconClasses} />,
		},
		{
			value: '+420 608 813 049',
			icon: <PhoneIcon className={iconClasses} />,
		},
		{
			value: 'IČ: 08874867',
			icon: <CheckBadgeIcon className={iconClasses} />,
		},
	];
	return (
		<footer className="bg-primary-blue text-white">
			<Container customStyles="flex flex-col justify-between items-start lg:flex-row gap-10">
				<div className={boxClasses}>
					<h2 className={headerClasses}>Kontakt</h2>

					<ul className={listClasses}>
						{footerList?.map(({ value, icon }) => (
							<div key={value} className="flex items-center gap-5">
								{icon}
								<li className="font-light p-2">{value}</li>
							</div>
						))}
					</ul>
				</div>

				<nav className={boxClasses}>
					<h2 className={headerClasses}>Navigace</h2>

					<ul className={listClasses}>
						{navLinks?.map(({ value, label }) => (
							<div key={value} className="flex items-center gap-5">
								<Link href={value}>
									<li className="font-light p-2">{label}</li>
								</Link>
							</div>
						))}
					</ul>
				</nav>

				<div className={boxClasses}>
					<h2 className={headerClasses}>Sociální média</h2>

					<ul className={listClasses}>
						{socialMedia?.map(({ value, label }) => (
							<Link key={value} href={value} target="_blank">
								<li className="font-light p-2">{label}</li>
							</Link>
						))}
					</ul>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
