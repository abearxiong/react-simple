/* eslint-disable global-require */
/* eslint-env node */
/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  important: '#root', // important in prod is must be
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
};
