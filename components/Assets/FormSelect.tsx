import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import { inputClass } from './FormInput';

export const selectBoxClass = 'flex flex-col gap-1 ';

const FormSelect: React.FC<any> = ({
  name,
  label,
  options,
  customStyles,
  firstEmpty,
  emptyLabel,
  ...props
}) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;

  return (
    <div className={selectBoxClass}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <select id={id} {...field} {...props} className={classNames(inputClass, customStyles)}>
        {firstEmpty && <option value={''}>{emptyLabel}</option>}
        {options.map(({ label, value }: any) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default FormSelect;
