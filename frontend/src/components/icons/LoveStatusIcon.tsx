// import React from 'react'; // Import React for JSX

// Define the Emoji Icon component for the status card
const LoveStatusIcon = (props: { className?: string }) => (
  <span 
    {...props} 
    // text-base is roughly 16px, matching the typical 1rem size of icons in BentoCard
    // props.className will likely carry color information e.g., text-slate-500
    className={`flex items-center justify-center text-5xl ${props.className || ''}`}
  >
    🥰
  </span>
);

export default LoveStatusIcon; 