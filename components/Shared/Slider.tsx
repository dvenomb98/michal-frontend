import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import useMobileWidth from '../../hooks/useMobile';

interface SliderProps {
  images: string[];
}

type Position = 'LEFT' | 'RIGHT';

const Slider: React.FC<SliderProps> = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { isMobile } = useMobileWidth();

	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		breakpoints: isMobile
			? {
				'(max-width: 1024px)': {
					slides: {
						origin: 'center',
						perView: 1.25,
						spacing: 15,
					},
				},
			}
			: {
				'(min-width: 1024px)': {
					slides: null,
				},
			},
	});

	const handleArrows = (event: any, position: Position) => {
		if (position === 'LEFT') {
			if (currentSlide !== 0) event.stopPropagation() || instanceRef.current?.prev();
		}

		if (position === 'RIGHT') {
			event.stopPropagation() || instanceRef.current?.next();
		}
	};

	return (
		<div className="flex flex-col lg:flex-row items-center justify-around gap-10 lg:gap-0 ">
			<h2 className="title self-start lg:self-auto relative">
        Reakce plné emocí
				<HeartIcon className="w-64 h-64 absolute text-primary-gray opacity-20 -top-24 left-10" />
			</h2>

			<div className="flex items-center w-full h-auto lg:w-[600px] gap-5">
				{!isMobile && (
					<ChevronLeftIcon onClick={(e: any) => handleArrows(e, 'LEFT')} className="w-16 h-16" />
				)}
				<div ref={sliderRef} className="keen-slider lg:shadow-xl">
					{images?.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt="Reference klientů"
							width={600}
							height={600}
							className="keen-slider__slide rounded-sm"
						/>
					))}
				</div>

				{!isMobile && (
					<ChevronRightIcon onClick={(e: any) => handleArrows(e, 'RIGHT')} className="w-16 h-16" />
				)}
			</div>
		</div>
	);
};

export default Slider;
