import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import Button from '../components/Assets/Button';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import useMobileWidth from '../components/Layouts/isMobile';
import Banner from '../components/Shared/Banner';
import BannerInfo from '../components/Shared/BannerInfo';
import ReasonsBoxes from '../components/Shared/ReasonsBoxes';
import Showcases from '../components/Shared/Showcases';
import { db } from '../firebase';
import { PromoVidea } from '../types/firebaseTypes';

interface SvatbyProps {
  data: PromoVidea;
}

// useEffect(() => {

// 	setDoc(doc(db, "promo-videa", "layout"), upload, {merge: true});

//  }, [])

const Promo: React.FC<SvatbyProps> = ({ data }) => {
	const { showcases, banner, expectation, youtubeReview, reasonsBoxes } = data.promoVideaData;
	const { sharedBannerData } = data;
	const { isMobile } = useMobileWidth();

	return (
		<Background>
			{/* Banner */}
			<Banner image={banner?.img} title={banner?.title} />
			<Container customStyles="sharedLayout">
				{/* Ukázky */}
				{showcases?.length && <Showcases showcases={showcases} />}

				{/* Co ode mně můžete čekat? Video genereujeme z public folderu */}
				{expectation?.length && (
					<div className="flex flex-col items-start lg:flex-row lg:items-center justify-between gap-10 ">
						{!isMobile && (
							<video autoPlay muted loop className="w-full lg:w-1/2  border-red-500 border ">
								<source src={'/videos/promovideo.mp4'} />
							</video>
						)}
						<div className="flex flex-col gap-5 w-full lg:w-1/2">
							<h2 className="title">Co ode mě můžete čekat?</h2>
							<ul>
								{expectation.map((text) => (
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
				)}

				{/* Youtube Review */}
				{youtubeReview && (
					<div className="flex flex-col items-center gap-5">
						<p className="font-semibold">{youtubeReview.description}</p>
						<iframe
							className="w-full h-96 lg:w-[600px]"
							loading={'lazy'}
							src={youtubeReview.url}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</div>
				)}
			</Container>
			{/* Banner Info*/}
			{sharedBannerData && <BannerInfo data={sharedBannerData} />}
			<Container customStyles="sharedLayout">
				{/* Duvody PROČ  */}
				{reasonsBoxes && (
					<ReasonsBoxes title={reasonsBoxes?.title} reasons={reasonsBoxes?.reasons} />
				)}
			</Container>
		</Background>
	);
};

export async function getStaticProps() {
	const [promoVideaSnapshot, sharedBannerSnapshot] = await Promise.allSettled([
		getDoc(doc(db, 'promo-videa', 'layout')),
		getDoc(doc(db, 'shared', 'bannerInfo')),
	]);

	const promoVideaData =
    promoVideaSnapshot.status === 'fulfilled' ? promoVideaSnapshot.value.data() : {};
	const sharedBannerData =
    sharedBannerSnapshot.status === 'fulfilled' ? sharedBannerSnapshot.value.data() : {};

	return {
		props: {
			data: {
				promoVideaData,
				sharedBannerData,
			},
		},
	};
}

export default Promo;
