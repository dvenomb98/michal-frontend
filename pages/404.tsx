import Link from 'next/link';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';

const Page404 = () => {
	return (
		<Background>
			<Container customStyles="h-[720px]">
				<h1 className="text-headline mb-5">Stránka nenalezena :(</h1>
				<p>
          Omlouváme se, ale tahle stránka neexistuje. Zkuste některou z{' '}
					<Link href="/" className="text-primary-blue hover:underline">
            dostupných stránek
					</Link>
          .
				</p>
			</Container>
		</Background>
	);
};

export default Page404;
