import React from 'react';
import { useField } from 'formik';
import { inputBoxClass, inputClass } from './FormInput';
import classNames from 'classnames';

const DatePicker: React.FC<any> = ({ name, label, customClasses, ...props }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;
  return (
    <div className={inputBoxClass}>
      {!!label && <label htmlFor={id}>{label}</label>}

      <input
        type="date"
        id={id}
        {...field}
        {...props}
        className={classNames(inputClass, customClasses)}
      />

      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default DatePicker;
