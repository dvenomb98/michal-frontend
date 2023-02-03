import Facebook from '../public/icons/Facebook.svg';
import Instagram from '../public/icons/Instagram.svg';
import Youtube from '../public/icons/Youtube.svg';

export const iconClasses = 'w-8 h-8';
export const svgClasses = 'w-8 h-8 fill-white';

export const navLinks = [
	{ value: '/svatby', label: 'Svatby', sublabel: 'Vzpomínka na celý život' },
	{ value: '/promo-videa', label: 'Promo videa', sublabel: 'Získejte nové klienty' },
	{ value: '/eventy', label: 'Eventy', sublabel: 'Uchovejte jedinečný zážitek' },
	{ value: '/blog', label: 'Blog', sublabel: 'Aktuality a zajimávosti' },
];

export const socialMedia = [
	{
		label: 'Facebook',
		value: 'https://www.facebook.com/perspective.cz/',
		icon: <Facebook className={svgClasses} />,
	},
	{
		label: 'Instagram',
		value: 'https://www.instagram.com/perspective_vid/',
		icon: <Instagram className={svgClasses} />,
	},
	{
		label: 'Youtube',
		value: 'https://www.youtube.com/channel/UCmHpSN-mr1do1bbVWkBK5hA',
		icon: <Youtube className={svgClasses} />,
	},
];
