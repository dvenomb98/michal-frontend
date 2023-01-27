import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';
import { FaqTypes } from '../../types/firebaseTypes';

interface FaqProps {
  faqComponent: FaqTypes[];
}

const Faq: React.FC<FaqProps> = ({ faqComponent }) => {
	return (
		<div className="flex flex-col gap-10">
			<h2 className="title">Často kladené otázky</h2>
			<div className="flex flex-col  rounded-sm">
				{faqComponent.map(({ answer, question }) => (
					<Disclosure key={`${answer}${question}`}>
						{({ open }) => (
							<div className="flex flex-col">
								<Disclosure.Button className=" w-full flex text-left bg-secondary-white hover:bg-sky-100/50 transition ease-in-out p-5 justify-between items-center rounded-sm">
									{question}
									<ChevronDownIcon className={classNames('w-5 h-5', open && 'rotate-180')} />
								</Disclosure.Button>
								<Transition
									enter="transition duration-200 ease-in"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
								>
									<Disclosure.Panel className="text-primary-gray p-10">{answer}</Disclosure.Panel>
								</Transition>
							</div>
						)}
					</Disclosure>
				))}
			</div>
		</div>
	);
};

export default Faq;
