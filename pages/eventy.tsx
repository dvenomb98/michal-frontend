import { doc, getDoc } from 'firebase/firestore';
import React from 'react';

import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';

import Banner from '../components/Shared/Banner';
import BannerInfo from '../components/Shared/BannerInfo';
import ContactMe from '../components/Shared/ContactMe';
import PlainText from '../components/Shared/PlainText';
import ReasonsBoxes from '../components/Shared/ReasonsBoxes';
import Showcases from '../components/Shared/Showcases';
import { db } from '../firebase';
import { EventyPage } from '../types/firebaseTypes';

interface SvatbyProps {
  data: EventyPage;
}

const Eventy: React.FC<SvatbyProps> = ({ data }) => {
  const { showcases, banner, reasonsBoxes, plainText } = data.eventyData;
  const { sharedBannerData, contactCompData } = data;

  return (
    <Background>
      <Banner image={banner?.img!} title={banner?.title} />
      <Container customStyles="sharedLayout">
        {showcases?.length && <Showcases showcases={showcases} />}
        {plainText?.length && <PlainText texts={plainText} />}
        {reasonsBoxes && (
          <ReasonsBoxes title={reasonsBoxes?.title} reasons={reasonsBoxes?.reasons} />
        )}
      </Container>

      {sharedBannerData && <BannerInfo data={sharedBannerData} />}

      <Container customStyles="sharedLayout">
        {contactCompData && (
          <ContactMe
            title={contactCompData.title}
            description={contactCompData.description}
            buttonText={contactCompData.buttonText}
          />
        )}
      </Container>
    </Background>
  );
};

export async function getStaticProps() {
  const [eventySnapshot, sharedBannerSnapshot, contactComponentSnapshot] = await Promise.all([
    getDoc(doc(db, 'eventy', 'layout')),
    getDoc(doc(db, 'shared', 'bannerInfo')),
    getDoc(doc(db, 'shared', 'contactComponent')),
  ]);

  const eventyData = eventySnapshot.data();
  const sharedBannerData = sharedBannerSnapshot.data();
  const contactCompData = contactComponentSnapshot.data();

  return {
    props: {
      data: {
        eventyData,
        sharedBannerData,
        contactCompData,
      },
    },
  };
}

export default Eventy;
