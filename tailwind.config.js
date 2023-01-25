/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				h4: ['1.125rem', '1'], // 18px
				h3: ['1.25rem', '1'], // 20px
				h2: ['1.5rem', '1'], // 24px
				h1: ['2.25rem', '1'], // 30px
				headline: ['3.25rem', '1.25'],
				banner: ['4.25rem', '1'],
				small: ['0.75rem', '1'],
			},
			fontFamily: {
				baseFamily: 'Inter',
			},
			colors: {
				'primary-black': '#111827',
				'primary-white': '#fcfcfd',
				'primary-blue': '#04aadd',
				'primary-red': '#dc2626',
				'secondary-white': '#FFFFFF',
				'primary-gray': '#6b7280',
				'input-color': '#e5e7eb',
			},
		},
	},
	plugins: [],
};
