import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';

const Page404 = () => {
	return (
		<Background>
			<Container customStyles="h-[720px]">
				<h1 className="text-headline">Stránka nenalezena</h1>
				<p>Omlouváme se, ale tahle stránka neexistuje. Zkuste některou z dostupných stránek</p>
			</Container>
		</Background>
	);
};

export default Page404;
