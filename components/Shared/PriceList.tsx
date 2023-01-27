import Link from 'next/link';
import React from 'react';
import { PriceList as PriceListTypes } from '../../types/firebaseTypes';

interface PriceListProps {
  priceList: PriceListTypes[];
}

const PriceList: React.FC<PriceListProps> = ({ priceList }) => {
	return (
		<div className="flex flex-col gap-10">
			<h2 className="title">Ceník svatebních videích</h2>
			<div className="flex gap-5 rounded-md flex-col lg:flex-row  ">
				{priceList.map(({ title, description, price }) => (
					<Link href="/kontakt" className="basis-1/3" key={title}>
						<div className="bg-secondary-white p-5 flex flex-col gap-10 h-full w-full  transition-all hover:border-primary-blue hover:shadow-primary-blue/50 shadow-lg border-primary-white border-2 rounded-md ease-in-out ">
							<p className="text-h2 font-semibold">{title}</p>
							<p className="text-primary-gray ">{description}</p>

							<p className=" font-semibold text-h1 flex-1 flex items-end">{price}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default PriceList;
