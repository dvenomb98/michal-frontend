import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import Button from '../components/Assets/Button';
import Background from '../components/Layouts/Background';
import Container from '../components/Layouts/Container';
import useMobileWidth from '../components/Layouts/isMobile';
import Banner from '../components/Shared/Banner';
import BannerInfo from '../components/Shared/BannerInfo';
import ContactMe from '../components/Shared/ContactMe';
import PlainText from '../components/Shared/PlainText';
import ReasonsBoxes from '../components/Shared/ReasonsBoxes';
import Showcases from '../components/Shared/Showcases';
import { db } from '../firebase';
import { PromoVidea } from '../types/firebaseTypes';

interface SvatbyProps {
  data: PromoVidea;
}

// 	useEffect(() => {

// 	setDoc(doc(db, "svatby", "layout"), XXX, {merge: true});

//  }, [])

const Promo: React.FC<SvatbyProps> = ({ data }) => {
  const { showcases, banner, expectation, youtubeReview, reasonsBoxes, plainText } =
    data.promoVideaData;
  const { sharedBannerData, contactCompData } = data;
  const { isMobile } = useMobileWidth();

  return (
    <Background>
      <Banner image={banner?.img!} title={banner?.title} />
      <Container customStyles="sharedLayout">
        {showcases?.length && <Showcases showcases={showcases} />}
        {plainText?.length && <PlainText texts={plainText} />}

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

      {sharedBannerData && <BannerInfo data={sharedBannerData} />}
      <Container customStyles="sharedLayout">
        {reasonsBoxes && (
          <ReasonsBoxes title={reasonsBoxes?.title} reasons={reasonsBoxes?.reasons} />
        )}
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
  const [promoVideaSnapshot, sharedBannerSnapshot, contactComponentSnapshot, seoSnapshot] =
    await Promise.all([
      getDoc(doc(db, 'promo-videa', 'layout')),
      getDoc(doc(db, 'shared', 'bannerInfo')),
      getDoc(doc(db, 'shared', 'contactComponent')),
      getDoc(doc(db, 'promo-videa', 'seo')),
    ]);

  const promoVideaData = promoVideaSnapshot.data();
  const sharedBannerData = sharedBannerSnapshot.data();
  const contactCompData = contactComponentSnapshot.data();
  const seoData = seoSnapshot.data();

  return {
    props: {
      data: {
        promoVideaData,
        sharedBannerData,
        contactCompData,
        seoData,
      },
    },
  };
}

export default Promo;
