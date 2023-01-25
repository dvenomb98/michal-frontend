import { CheckBadgeIcon, InboxIcon, PhoneIcon } from '@heroicons/react/24/outline';

const iconClasses = 'w-8 h-8';

export const footerList = [
	{
		value: 'info@perspective-video.cz',
		icon: <InboxIcon className={iconClasses} />,
	},
	{
		value: '+420 608 813 049',
		icon: <PhoneIcon className={iconClasses} />,
	},
	{
		value: 'IČ: 08874867',
		icon: <CheckBadgeIcon className={iconClasses} />,
	},
];

export const navLinks = [
	{ value: '/svatby', label: 'Svatby', sublabel: 'Vzpomínka na celý život' },
	{ value: '/promo-videa', label: 'Promo videa', sublabel: 'Získejte nové klienty' },
	{ value: '/eventy', label: 'Eventy', sublabel: 'Uchovejte jedinečný zážitek' },
];

export const socialMedia = [
	{ label: 'Facebook', value: 'https://www.facebook.com/perspective.cz/' },
	{ label: 'Instagram', value: 'https://www.instagram.com/perspective_vid/' },
	{ label: 'Youtube', value: 'https://www.youtube.com/channel/UCmHpSN-mr1do1bbVWkBK5hA' },
];
