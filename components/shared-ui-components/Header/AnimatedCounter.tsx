'use client';
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const AnimatedCounter = () => {
  const [count, setCount] = useState(17845);
  const [displayValue, setDisplayValue] = useState('17,845');

  // Spring animation for smooth counting
  const springCount = useSpring(0, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    springCount.set(count);
  }, [count, springCount]);

  // Update display value when spring changes
  useEffect(() => {
    const unsubscribe = springCount.on('change', (latest) => {
      setDisplayValue(Math.floor(latest).toLocaleString());
    });

    return () => unsubscribe();
  }, [springCount]);

  // Auto increment every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 100) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="text-white px-4 lg:px-6 py-1 text-xs lg:text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 whitespace-nowrap"
      style={{
        borderRadius: '22px',
        background:
          'linear-gradient(270deg, #F8721D 0%, #D347EF 50%, #5146E6 100%)',
        minWidth: '140px',
      }}
    >
      <motion.span
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-semibold inline-block"
        style={{ minWidth: '100px', textAlign: 'center' }}
      >
        {displayValue}🔥
      </motion.span>
    </motion.button>
  );
};

export default AnimatedCounter;
