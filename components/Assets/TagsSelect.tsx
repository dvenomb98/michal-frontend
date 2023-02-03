import React from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { inputClass } from './FormInput';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { selectBoxClass } from './FormSelect';

const TagsSelect: React.FC<any> = ({
  name,
  label,
  options,
  customStyles,
  firstEmpty,
  selectedOptions,
  ...props
}) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const id = `${name}-${field.name}`;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions).map(
      (option: HTMLOptionElement) => option.value,
    );

    setFieldValue(field.name, [...field.value, ...selectedValues]);
  };

  const handleRemoveOption = (option: string) => {
    setFieldValue(
      field.name,
      selectedOptions.filter((selectedOption: string) => selectedOption !== option),
    );
  };
  return (
    <div className={selectBoxClass}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <div className="flex flex-wrap">
        {selectedOptions.map((selectedOption: string) => (
          <div
            key={selectedOption}
            className="bg-primary-gray text-white 0 p-2 rounded-sm mr-2 mb-2 flex items-center gap-2"
          >
            {selectedOption}
            <XMarkIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleRemoveOption(selectedOption)}
            />
          </div>
        ))}
      </div>

      <select
        id={id}
        onChange={handleChange}
        value={field.value}
        {...props}
        className={classNames(inputClass, customStyles)}
      >
        {firstEmpty && <option value={''}>Vyberte ze seznamu</option>}
        {options?.map((option: string) => (
          <option key={option} value={option} disabled={selectedOptions.includes(option)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagsSelect;
