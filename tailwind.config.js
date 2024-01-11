/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-animation-delay'),
    ],
})
