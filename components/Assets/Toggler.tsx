import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import React, { FC } from 'react';

interface TogglerProps {
  checked: boolean;
  setFunc?: () => void;
  srOnly: string;
  disabled?: boolean;
}

const Toggler: FC<TogglerProps> = ({ checked, setFunc, srOnly, disabled }) => {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={setFunc ? setFunc : () => void {}}
      className={classNames(
        'relative inline-flex h-8 w-16 items-center rounded-full',
        checked ? 'bg-slate-300' : 'bg-primary-gray/80',
      )}
    >
      <span className="sr-only">{srOnly}</span>
      <span
        className={`${
          checked ? 'translate-x-9 bg-primary-blue' : 'translate-x-1 bg-white'
        } inline-block h-6 w-6  transform rounded-full  transition`}
      />
    </Switch>
  );
};

export default Toggler;
