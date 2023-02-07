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
            Souhlas s používáním cookies
          </Dialog.Title>
          <Dialog.Description className="text-primary-gray">
            Za účelem lepšího výkonu a analýzy výkonnosti webu, používáme soubory cookie i soubory
            cookie třetích stran. Všechny soubory cookie můžete přijmout tak, že kliknete na možnost
            “Přijmout vše”. Alternativně můžete upravit nastavení.{' '}
          </Dialog.Description>

          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
            <Button onClick={() => handleAllowAll()}>Přijmout vše</Button>
            <Button
              onClick={() => handleOpenPreferences()}
              customStyles="bg-primary-white text-black hover:bg-primary-gray/50"
            >
              Upravit předvolby
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
            <Dialog.Title className="text-h3 font-semibold">Cookies předvolby</Dialog.Title>
            <Dialog.Description className="text-primary-gray">
              Při navštěvování webových stránek, mohou ukládat nebo načítat data ve vašem
              prohlížeči. Toto úložiště je často nezbytné pro základní funkčnost webu. Úložiště může
              být použito pro marketing, analýzu a personalizaci stránek, jako je ukládání vašich
              preferencí. Soukromí je pro nás důležité, takže máte možnost zakázat určité typy
              úložiště, které nemusí být nutné pro základní fungování webu. Blokování jednotlivých
              kategorií může ovlivnit vaši zkušenost s webem{' '}
            </Dialog.Description>

            <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
              <Button onClick={() => handleAllowAll()}>Přijmout vše</Button>
              <Button
                onClick={() => handleAllowRequired()}
                customStyles="bg-primary-white text-black hover:bg-primary-gray/50"
              >
                Zakázát vše
              </Button>
            </div>

            {/* COOKIES PŘEDVLOBY */}

            <div className="flex flex-col items-start gap-5 w-full ">
              <h3 className="text-h3 font-semibold">Nastavte souhlas dle kategorie</h3>

              <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Základní</p>
                  <p className="text-primary-gray">
                    Nutné k základní funkčnosti webu.{' '}
                    <span className="font-semibold">Vždy aktivní.</span>
                  </p>
                </div>
                <div>
                  <Toggler checked={allowedCookies.required} disabled srOnly="Základní" />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Analytické</p>
                  <p className="text-primary-gray lg:w-2/3 ">
                    Tyto položky pomáhají provozovateli webu porozumět tomu, jak jeho web funguje,
                    jak návštěvníci s webem komunikují a zda mohou nastat technické problémy. Tento
                    typ úložiště obvykle neshromažďuje informace, které identifikují návštěvníka.
                  </p>
                </div>
                <div>
                  <Toggler
                    checked={allowedCookies.analytics}
                    setFunc={() =>
                      setAllowedCookies({ ...allowedCookies, analytics: !allowedCookies.analytics })
                    }
                    srOnly="Analytické"
                  />
                </div>
              </div>

              <Button onClick={() => handleAllowPreferences()}>Uložit nastavení</Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CookiesModal;
