import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Showcases as ShowCasesTypes } from '../../types/firebaseTypes';

interface ShowcasesProps {
  showcases: ShowCasesTypes[];
}

const Showcases: React.FC<ShowcasesProps> = ({ showcases }) => {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-5">
			{showcases.map(({ url, img, title }) => (
				<div key={title} className="relative group overflow-hidden">
					<Link href={url} target="_blank">
						<Image src={img} alt={title} width={600} height={600} />

						<div className="absolute inset-0 bg-gradient-to-t from-black group-hover:bg-black opacity-40 duration-300" />

						<p className="absolute bottom-5 left-5 text-white font-semibold text-h3 transform group-hover:-translate-y-5 duration-300">
							{title}
						</p>
						<ArrowRightIcon className="w-5 h-5 absolute z-20 bottom-3 left-0 transform -translate-x-5 group-hover:translate-x-5 duration-300 text-white" />
					</Link>
				</div>
			))}
		</div>
	);
};

export default Showcases;
