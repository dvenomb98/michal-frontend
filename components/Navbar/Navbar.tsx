import Link from 'next/link';
import React from 'react';
import Button from '../Assets/Button';
import Background from '../Layouts/Background';
import Container from '../Layouts/Container';
import { ArrowLongRightIcon, Bars4Icon } from '@heroicons/react/24/outline';
import useMobileWidth from '../Layouts/isMobile';
import { Popover } from '@headlessui/react';
import { navLinks } from '../../constants/shared';
import perspective_logo from '../../public/icons/perspective_logo.png';
import Image from 'next/image';

const Navbar = () => {
  const { isMobile } = useMobileWidth();

  return (
    <Background>
      <Container customStyles="py-8 flex justify-between items-center">
        <>
          <Link href="/">
            <Image
              src={perspective_logo}
              width={isMobile ? 50 : 80}
              height={isMobile ? 50 : 80}
              alt="Logo"
            />
          </Link>
          {!isMobile && (
            <ul className="flex flex-row gap-10 items-center">
              {navLinks?.map(({ value, label }) => (
                <Link href={value} key={label}>
                  <li className="hover:text-primary-blue transition-colors ease-in-out whitespace-nowrap">
                    {label}
                  </li>
                </Link>
              ))}
              <Button href="/kontakt" customStyles="flex items-center justify-center gap-2 group">
                <>
                  <span>Kontaktovat</span>
                  <ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:transition group-hover:ease-in-out" />
                </>
              </Button>
            </ul>
          )}

          {isMobile && (
            <Popover className="relative">
              <Popover.Button className="outline-none">
                <Bars4Icon className="w-6 h-6" />
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-30 z-40 " />
              <Popover.Panel className="absolute right-0 bg-primary-white z-50 p-5 rounded-sm">
                <ul className="flex flex-col gap-5 ">
                  {navLinks?.map(({ value, label, sublabel }) => (
                    <Link href={value} key={label}>
                      <li className="hover:text-primary-blue transition-all ease-in-out whitespace-nowrap flex flex-col hover:bg-primary-gray/10 p-2 rounded-sm w-full">
                        {label}
                        <span className="text-primary-gray">{sublabel}</span>
                      </li>
                    </Link>
                  ))}
                  <Button
                    href="/kontakt"
                    customStyles="flex items-center justify-center gap-2 group"
                  >
                    <>
                      <span>Kontaktovat</span>
                      <ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:transition group-hover:ease-in-out" />
                    </>
                  </Button>
                </ul>
              </Popover.Panel>
            </Popover>
          )}
        </>
      </Container>
    </Background>
  );
};

export default Navbar;
