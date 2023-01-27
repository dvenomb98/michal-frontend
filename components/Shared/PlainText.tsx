import React from 'react';

interface PlainTextProps {
  texts: string[];
}

const PlainText: React.FC<PlainTextProps> = ({ texts }) => {
	return (
		<div className="flex flex-col gap-5">
			{texts?.map((t) => (
				<p key={t}>{t}</p>
			))}
		</div>
	);
};

export default PlainText;
