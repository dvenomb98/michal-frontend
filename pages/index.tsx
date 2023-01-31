import Button from '../components/Assets/Button';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { SquareData } from '../types/firebaseTypes';
import { FC, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface SquareProps {
  data: SquareData[];
}

const Square: FC<SquareProps> = ({ data }) => {
	const [selectedImg, setSelectedImg] = useState<string>(data[0]?.img);
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
			{data.map(({ img, name }, index) => (
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
				{data.map(({ name, url, img }, index) => (
					<Button
						key={`${name}_${index}`}
						href={url}
						mouseEnter={() => selectedImg !== img && handleMouseEnter(img)}
						customStyles={'py-5 bg-primary-blue/60'}
					>
						<span className="text-h3">{name}</span>
					</Button>
				))}
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const snapshot = await getDocs(collection(db, 'square'));
	const data = snapshot.docs.map((doc) => doc.data());

	// Return props
	return {
		props: {
			data,
		},
	};
}

export default Square;
