import { Dialog } from '@headlessui/react';
import { setAnalyticsCollectionEnabled } from 'firebase/analytics';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from '../Assets/Button';
import Toggler from '../Assets/Toggler';
import { analytics } from '../../firebase';

interface CookiesModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

enum CookiesValues {
  ANALYTICS = 'analytics',
  REQUIRED = 'required',
}

const CookiesModal: React.FC<CookiesModalProps> = ({ open, setOpen }) => {
  const [, setCookie] = useCookies();
  const [openPreferences, setOpenPreferences] = useState<boolean>(false);
  const [allowedCookies, setAllowedCookies] = useState({ analytics: true, required: true });

  // expires one year from now
  const options = { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) };

  const handleAllowAll = () => {
    setCookie(CookiesValues.ANALYTICS, true, options);
    setCookie(CookiesValues.REQUIRED, true, options);
    setAnalyticsCollectionEnabled(analytics!, true);
    setOpen(false);
    setOpenPreferences(false);
  };

  const handleOpenPreferences = () => {
    setOpenPreferences(true);
    setOpen(false);
  };

  const handleAllowRequired = () => {
    setCookie(CookiesValues.REQUIRED, true, options);
    setCookie(CookiesValues.ANALYTICS, false, options);
    setAnalyticsCollectionEnabled(analytics!, false);
    setOpenPreferences(false);
  };

  const handleAllowPreferences = () => {
    setCookie(CookiesValues.REQUIRED, allowedCookies.required, options);
    setCookie(CookiesValues.ANALYTICS, allowedCookies.analytics, options);

    if (!allowedCookies.analytics) {
      setAnalyticsCollectionEnabled(analytics!, false);
    } else {
      setAnalyticsCollectionEnabled(analytics!, true);
    }

    setOpenPreferences(false);
  };

  return !openPreferences ? (
    <Dialog open={open} onClose={() => void {}} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-primary-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-end  justify-center">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="p-5 py-16 lg:py-5  rounded-sm bg-secondary-white  flex flex-col gap-5">
          <Dialog.Title className="text-h3 font-semibold">
            Souhlas s pou????v??n??m cookies
          </Dialog.Title>
          <Dialog.Description className="text-primary-gray">
            Za ????elem lep????ho v??konu a anal??zy v??konnosti webu, pou????v??me soubory cookie i soubory
            cookie t??et??ch stran. V??echny soubory cookie m????ete p??ijmout tak, ??e kliknete na mo??nost
            ???P??ijmout v??e???. Alternativn?? m????ete upravit nastaven??.{' '}
          </Dialog.Description>

          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
            <Button onClick={() => handleAllowAll()}>P??ijmout v??e</Button>
            <Button
              onClick={() => handleOpenPreferences()}
              customStyles="bg-primary-white text-black hover:bg-primary-gray/50"
            >
              Upravit p??edvolby
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  ) : (
    <Dialog open={openPreferences} onClose={() => void {}} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-primary-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-end justify-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="p-10 py-16 lg:py-5 rounded-sm bg-secondary-white  flex flex-col gap-5">
            <Dialog.Title className="text-h3 font-semibold">Cookies p??edvolby</Dialog.Title>
            <Dialog.Description className="text-primary-gray">
              P??i nav??t??vov??n?? webov??ch str??nek, mohou ukl??dat nebo na????tat data ve va??em
              prohl????e??i. Toto ??lo??i??t?? je ??asto nezbytn?? pro z??kladn?? funk??nost webu. ??lo??i??t?? m????e
              b??t pou??ito pro marketing, anal??zu a personalizaci str??nek, jako je ukl??d??n?? va??ich
              preferenc??. Soukrom?? je pro n??s d??le??it??, tak??e m??te mo??nost zak??zat ur??it?? typy
              ??lo??i??t??, kter?? nemus?? b??t nutn?? pro z??kladn?? fungov??n?? webu. Blokov??n?? jednotliv??ch
              kategori?? m????e ovlivnit va??i zku??enost s webem{' '}
            </Dialog.Description>

            <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
              <Button onClick={() => handleAllowAll()}>P??ijmout v??e</Button>
              <Button
                onClick={() => handleAllowRequired()}
                customStyles="bg-primary-white text-black hover:bg-primary-gray/50"
              >
                Zak??z??t v??e
              </Button>
            </div>

            {/* COOKIES P??EDVLOBY */}

            <div className="flex flex-col items-start gap-5 w-full ">
              <h3 className="text-h3 font-semibold">Nastavte souhlas dle kategorie</h3>

              <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Z??kladn??</p>
                  <p className="text-primary-gray">
                    Nutn?? k z??kladn?? funk??nosti webu.{' '}
                    <span className="font-semibold">V??dy aktivn??.</span>
                  </p>
                </div>
                <div>
                  <Toggler checked={allowedCookies.required} disabled srOnly="Z??kladn??" />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Analytick??</p>
                  <p className="text-primary-gray lg:w-2/3 ">
                    Tyto polo??ky pom??haj?? provozovateli webu porozum??t tomu, jak jeho web funguje,
                    jak n??v??t??vn??ci s webem komunikuj?? a zda mohou nastat technick?? probl??my. Tento
                    typ ??lo??i??t?? obvykle neshroma????uje informace, kter?? identifikuj?? n??v??t??vn??ka.
                  </p>
                </div>
                <div>
                  <Toggler
                    checked={allowedCookies.analytics}
                    setFunc={() =>
                      setAllowedCookies({ ...allowedCookies, analytics: !allowedCookies.analytics })
                    }
                    srOnly="Analytick??"
                  />
                </div>
              </div>

              <Button onClick={() => handleAllowPreferences()}>Ulo??it nastaven??</Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CookiesModal;
