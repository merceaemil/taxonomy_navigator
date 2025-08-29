/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        // Primary Blue Colors
        'brand-blue': {
          100: '#00A1DE', // Blue Variation 1
          500: '#003F82', // Primary Blue
          600: '#003F82', // Primary Blue
          700: '#003F82', // Primary Blue
          900: '#001B3D', // Blue Variation 2
        },
        // Primary Green Colors
        'brand-green': {
          100: '#3DB874', // Green Variation 1
          500: '#20603D', // Primary Green
          900: '#143E28', // Green Variation 2
        },
        'brand-gold': {
          100: '#FDE35D', // Gold Variation 1 (light yellow)
          500: '#E5BE01', // Secondary Gold (medium yellow)
          900: '#CAA902', // Gold Variation 2 (dark yellow)
        },
        // Grey Colors
        grey: {
          400: '#9CA3AF',
          900: '#111827',
        },
      },
      fontSize: {
        // Text sizes
        'xs': ['12px', { lineHeight: '18px' }],        // caption
        'sm': ['14px', { lineHeight: '16px' }],        // paragraph-01
        'base': ['16px', { lineHeight: '24px' }],      // paragraph-02
        'lg': ['18px', { lineHeight: '24px' }],        // paragraph-03
        'xl': ['20px', { lineHeight: '28px' }],        // subheading
        '2xl': ['23px', { lineHeight: '28px' }],       // heading-05
        '3xl': ['28px', { lineHeight: '34px' }],       // heading-04
        '4xl': ['33px', { lineHeight: '40px' }],       // heading-03
        '5xl': ['39px', { lineHeight: '47px' }],       // heading-02
        '6xl': ['48px', { lineHeight: '56px' }],       // heading-01
        '7xl': ['60px', { lineHeight: '72px' }],       // display-02
        '8xl': ['72px', { lineHeight: '80px' }],       // display-01
        '9xl': ['80px', { lineHeight: '96px' }],       // special-80,
        
        // Display Text
        'display-01': ['72px', { lineHeight: '80px', letterSpacing: '-0.04em' }],
        'display-02': ['60px', { lineHeight: '72px', letterSpacing: '-0.04em' }],
        
        // Headings
        'heading-01': ['48px', { lineHeight: '56px', letterSpacing: '-0.04em' }],
        'heading-02': ['39px', { lineHeight: '47px', letterSpacing: '-0.04em' }],
        'heading-03': ['33px', { lineHeight: '40px', letterSpacing: '-0.04em' }],
        'heading-04': ['28px', { lineHeight: '34px', letterSpacing: '-0.02em' }],
        'heading-05': ['23px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        'heading-06': ['19px', { lineHeight: '23px', letterSpacing: '-0.02em' }],
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.04em',
        'normal': '-0.02em',
        'wide': '0.08em',
      }
    },
  },
  plugins: [],
}
