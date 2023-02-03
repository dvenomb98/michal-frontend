import { useField } from "formik";
import React from "react"


const FormCheckbox: React.FC<any> = ({ name, label, checked, ...props }) => {
    const [field, meta] = useField({ name });
    const errorText = meta.error && meta.touched ? meta.error : '';
    const id = `${name}-${field.name}`;

    console.log(checked)
    
    return (
      <div className="flex items-center gap-5">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          {...field}
          {...props}
          type="checkbox"
          className="w-5 h-5 rounded-sm"
          value={checked}

        />
        
        {!!errorText && <span className="text-primary-red">{errorText}</span>}
      </div>
    );
  };
  
  export default FormCheckbox;