import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { BannerInfo as BannerInfoData } from '../../types/firebaseTypes';
import Button from '../Assets/Button';
import OverlayImage from '../Assets/Overlay';
import Container from '../Layouts/Container';

interface BannerInfoProps {
  data: BannerInfoData;
}

const BannerInfo: React.FC<BannerInfoProps> = ({ data }) => {
  const { list, img } = data;

  return (
    <div className="relative w-full h-[600px] flex items-center">
      <Image src={img} alt={'O mně'} priority fill className="object-cover object-center" />
      <Container customStyles="py-0 relative z-10 text-white md:grid md:grid-cols-2">
        <div className="col-start-2 flex flex-col gap-10">
          <ul className="flex flex-col gap-5">
            {list?.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckIcon className="w-6 h-6 text-primary-blue" />
                <li>{item}</li>
              </div>
            ))}
          </ul>
          <div className="flex flex-col gap-5 w-full lg:w-3/5 ">
            <Button href="/kdojsem">Poznejte mě</Button>
            <a href="https://kit.co/perspective_video" target={'_blank'} rel={'noreferrer'}>
              <Button>Čím natáčím</Button>
            </a>
          </div>
        </div>
      </Container>
      <OverlayImage />
    </div>
  );
};

export default BannerInfo;
