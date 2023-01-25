import Link from 'next/link';
import React from 'react';
import { footerList, navLinks, socialMedia } from '../../constants/shared';
import Container from '../Layouts/Container';

const boxClasses = 'flex flex-col gap-5 basis-1/3';
const headerClasses = 'font-semibold text-h2';
const listClasses = 'flex flex-col gap-2';

const Footer = () => {
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
