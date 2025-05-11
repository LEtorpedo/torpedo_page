import React from 'react';
import { motion } from 'framer-motion';
import { Particles } from '../magicui/particles'; // Import Particles

const HeroSection: React.FC = () => {
  const headlineVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const subHeadlineVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  // const particleColor = "#4A5568"; // Previous hardcoded value
  const particleColorCSSVar = "var(--particle-color)"; // Using CSS Variable

  return (
    <section className="hero-section relative flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-brand-background text-brand-text-primary overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        color={particleColorCSSVar} // Use CSS variable string
        ease={50}
        staticity={30}
        size={0.5}
      />

      {/* Content Container - z-10 to be above particles */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-brand-text-primary"
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          你好，我是 Torpedo
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-brand-text-secondary mb-8 italic font-serif max-w-2xl mx-auto leading-relaxed"
          variants={subHeadlineVariants}
          initial="hidden"
          animate="visible"
        >
          莫听穿林打叶声，何妨吟啸且徐行。<br />
          竹杖芒鞋轻胜马，谁怕？<br />
          一蓑烟雨任平生。
        </motion.p>
        {/* Optional CTA Button with themed styles */}
        {/* 
        <motion.button 
          className="bg-brand-accent hover:bg-brand-accent-dark text-brand-text-inverted font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          了解更多
        </motion.button>
        */}
      </div>
    </section>
  );
};

export default HeroSection; 