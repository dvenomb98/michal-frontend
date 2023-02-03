import React from 'react';
import { ContactComponent } from '../../types/firebaseTypes';
import Button from '../Assets/Button';

const ContactMe: React.FC<ContactComponent> = ({ title, description, buttonText }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="title">{title}</h2>
      <p>{description}</p>
      <Button href="/kontakt">{buttonText}</Button>
    </div>
  );
};

export default ContactMe;
