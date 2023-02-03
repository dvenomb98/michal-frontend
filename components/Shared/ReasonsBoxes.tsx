import React from 'react';
import { ReasonsArr } from '../../types/firebaseTypes';

interface ReasonsBoxesProps {
  title: string;
  reasons: ReasonsArr[];
}

const ReasonsBoxes: React.FC<ReasonsBoxesProps> = ({ title, reasons }) => {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="title">{title}</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
        {reasons?.map(({ header, description }) => (
          <div key={header} className="flex flex-col gap-5 basis-1/3">
            <p className="text-h2 text-primary-blue">{header}</p>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsBoxes;
