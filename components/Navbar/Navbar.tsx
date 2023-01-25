import Link from 'next/link';
import React from 'react';
import Button from '../Assets/Button';
import Background from '../Layouts/Background';
import Container from '../Layouts/Container';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
	const links = [
		{ value: '/svatby', label: 'Svatby' },
		{ value: '/promo-videa', label: 'Promo videa' },
		{ value: '/eventy', label: 'Eventy' },
	];

	return (
		<Background>
			<Container customStyles="py-8 flex justify-between items-center">
				<>
					<p>Perspective</p>
					<ul className="flex flex-row gap-10 items-center">
						{links.map(({ value, label }) => (
							<Link href={value} key={label}>
								<li className="hover:text-primary-blue transition-colors ease-in-out whitespace-nowrap">
									{label}
								</li>
							</Link>
						))}
						<Button href="/kontakt" customStyles="flex items-center justify-center gap-2 group">
							<>
								<span>Kontaktovat</span>
								<ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:transition group-hover:ease-in-out" />
							</>
						</Button>
					</ul>
				</>
			</Container>
		</Background>
	);
};

export default Navbar;
