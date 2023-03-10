import Button from '../components/Assets/Button';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SquarePage } from '../types/firebaseTypes';
import { FC, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

interface SquareProps {
  data: SquarePage;
}

const Square: FC<SquareProps> = ({ data }) => {
  const { squareData } = data;

  const [selectedImg, setSelectedImg] = useState<string>(squareData[0]?.img);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const handleMouseEnter = (img: string) => {
    if (isLoaded) {
      setIsLoaded(false);
      setTimeout(() => {
        setIsLoaded(true);
        setSelectedImg(img);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {squareData?.map(({ img, name }, index) => (
        <Image
          src={img}
          className={classNames(
            'transition object-cover object-center',
            img === selectedImg ? 'opacity-100 duration-1000' : 'opacity-0 duration-1000',
          )}
          fill
          alt="Background"
          key={`${name}_${index}`}
        />
      ))}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 relative z-1">
        {squareData?.map(({ name, url, img }, index) => (
          <Button
            key={`${name}_${index}`}
            href={url}
            mouseEnter={() => selectedImg !== img && handleMouseEnter(img)}
            customStyles={'py-5 bg-primary-blue/60'}
            onClick={() => logEvent(analytics!, 'button_clicked', { name: name })}
          >
            <span className="text-h3">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const [squareSnapshot, seoSnapshot] = await Promise.all([
    getDoc(doc(db, 'square', 'layout')),
    getDoc(doc(db, 'square', 'seo')),
  ]);

  const squareData = squareSnapshot.data();
  const seoData = seoSnapshot.data();

  return {
    props: {
      data: {
        squareData: squareData?.content,
        seoData,
      },
    },
  };
}

export default Square;
