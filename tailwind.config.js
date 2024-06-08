/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#fca311',

          secondary: '#bb3e03',

          // accent: '#00ffff',

          // neutral: '#ff00ff',

          'base-100': '#ffffff',

          // info: '#0000ff',

          // success: '#00ff00',

          // warning: '#00ff00',

          // error: '#ff0000',
        },
      },
    ],
  },
};
