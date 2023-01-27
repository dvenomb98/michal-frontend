import Image from 'next/image';
import React from 'react';
import OverlayImage from '../Assets/Overlay';

interface BannerProps {
  image?: string;
  title: string;
  video?: string;
}

const Banner: React.FC<BannerProps> = ({ image, title, video }) => {
	return (
		<div className="relative w-full h-[600px] flex items-center justify-center">
			{video ? (
				<video autoPlay muted loop className="w-full h-full object-cover object-center ">
					<source src={video} />
				</video>
			) : (
				<Image src={image || ''} alt={title} priority fill className="object-cover object-center" />
			)}

			<OverlayImage />
			<h1 className="absolute z-10 text-white  text-h1 lg:text-headline font-medium">{title}</h1>
		</div>
	);
};

export default Banner;
