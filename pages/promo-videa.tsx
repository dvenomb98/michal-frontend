import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import Button from '../components/Assets/Button';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Banner from '../components/Shared/Banner';
import Showcases from '../components/Shared/Showcases';
import { db } from '../firebase';
import { PromoData } from '../types/firebaseTypes';

interface SvatbyProps {
  data: PromoData;
}

const Promo: React.FC<SvatbyProps> = ({ data }) => {
	const { showcases, banner, expectation } = data;

	return (
		<Background>
			<>
				<Banner image={banner?.img} title={banner?.title} />
				<Container customStyles="flex flex-col gap-16 py-16">
					<>
						{/* Ukázky */}
						<Showcases showcases={showcases} />

						{/* Co ode mně můžete čekat */}
						<div className="flex flex-col lg:flex-row items-center justify-between gap-10">
							<video
								autoPlay
								muted
								loop
								className="w-full lg:w-1/2 basis-1/2 border-red-500 border "
							>
								<source src={'/videos/promovideo.mp4'} />
							</video>
							<div className="flex flex-col gap-5 lg:w-1/2 basis-1/2">
								<h2 className="title">Co ode mě můžete čekat?</h2>
								<ul>
									{expectation?.map((text) => (
										<li key={text} className="pt-2 list-disc list-inside">
											{text}
										</li>
									))}
								</ul>

								<Button href="/kontakt" customStyles="xl:w-1/2">
									<span>Chci video</span>
								</Button>
							</div>
						</div>
					</>
				</Container>
			</>
		</Background>
	);
};

export async function getStaticProps() {
	const docSnapshot = await getDoc(doc(db, 'promo-videa', 'layout'));
	const data = docSnapshot.data();

	return {
		props: {
			data,
		},
	};
}

export default Promo;
