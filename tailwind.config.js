/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // RTL Transform classes
    'translate-x-0',
    '-translate-x-full',
    'translate-x-full',
    
    // Border classes for RTL
    'border-l',
    'border-r',
    'border-l-2',
    'border-r-2',
    'border-l-4',
    'border-r-4',
    
    // Position classes for RTL
    'left-0',
    'right-0',
    'left-2',
    'right-2',
    'left-3',
    'right-3',
    'left-4',
    'right-4',
    'left-6',
    'right-6',
    
    // Margin classes for RTL
    'ml-1',
    'ml-2',
    'ml-3',
    'ml-4',
    'ml-6',
    'mr-1',
    'mr-2',
    'mr-3',
    'mr-4',
    'mr-6',
    'ml-auto',
    'mr-auto',
    
    // Padding classes for RTL
    'pl-3',
    'pl-4',
    'pl-8',
    'pl-10',
    'pr-3',
    'pr-4',
    'pr-8',
    'pr-10',
    
    // Text alignment
    'text-left',
    'text-right',
    
    // Rounded corners
    'rounded-l',
    'rounded-r',
    'rounded-tl',
    'rounded-tr',
    'rounded-bl',
    'rounded-br',
    
    // Rotation classes
    'rotate-180',
    
    // Flexbox direction
    'flex-row',
    'flex-row-reverse',
    
    // Space classes
    'space-x-2',
    'space-x-3',
    'space-x-4',
    'space-x-6',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};