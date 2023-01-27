import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import Banner from '../components/Shared/Banner';
import BannerInfo from '../components/Shared/BannerInfo';
import ContactMe from '../components/Shared/ContactMe';
import Faq from '../components/Shared/Faq';
import PlainText from '../components/Shared/PlainText';
import PriceList from '../components/Shared/PriceList';
import ReasonsBoxes from '../components/Shared/ReasonsBoxes';
import Showcases from '../components/Shared/Showcases';
import Slider from '../components/Shared/Slider';
import { db } from '../firebase';
import { SvatbyPage } from '../types/firebaseTypes';

interface SvatbyProps {
  data: SvatbyPage;
}

const Svatby: React.FC<SvatbyProps> = ({ data }) => {
	const { showcases, banner, reasonsBoxes, plainText, references, priceList, faq } =
    data.svatbyData;
	const { sharedBannerData, contactCompData } = data;

	return (
		<Background>
			<Banner video={banner?.video} title={banner?.title} />

			<Container customStyles="sharedLayout">
				{showcases && <Showcases showcases={showcases} />}
				{plainText?.length && <PlainText texts={plainText} />}
				{reasonsBoxes && (
					<ReasonsBoxes title={reasonsBoxes?.title} reasons={reasonsBoxes.reasons} />
				)}
			</Container>
			{sharedBannerData && <BannerInfo data={sharedBannerData} />}
			<Container customStyles="sharedLayout">
				{references?.length && <Slider images={references} />}

				{priceList?.length && <PriceList priceList={priceList} />}

				{faq?.length && <Faq faqComponent={faq} />}

				{contactCompData && (
					<ContactMe
						buttonText={contactCompData?.buttonText}
						title={contactCompData?.title}
						description={contactCompData?.description}
					/>
				)}
			</Container>
		</Background>
	);
};

export async function getStaticProps() {
	const [svatbySnapshot, sharedBannerSnapshot, contactComponentSnapshot] = await Promise.all([
		getDoc(doc(db, 'svatby', 'layout')),
		getDoc(doc(db, 'shared', 'bannerInfo')),
		getDoc(doc(db, 'shared', 'contactComponent')),
	]);

	const svatbyData = svatbySnapshot.data();
	const sharedBannerData = sharedBannerSnapshot.data();
	const contactCompData = contactComponentSnapshot.data();

	return {
		props: {
			data: {
				svatbyData,
				sharedBannerData,
				contactCompData,
			},
		},
	};
}

export default Svatby;
