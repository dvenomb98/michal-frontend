import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';

const Page404 = () => {
	return (
		<Background>
			<Container>
				<h1 className="text-headline">Stránka nenalezena!</h1>
			</Container>
		</Background>
	);
};

export default Page404;
