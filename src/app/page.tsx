/* eslint-disable canonical/filename-match-exported */
'use client';
import { Intro } from './components/Intro/Intro';
import { PasoDos } from './components/PasoDos/PasoDos';
import { PasoUno } from './components/PasoUno/PasoUno';
import { theme } from './theme';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const firstAnimationDuration = 1.5;

const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
    target: targetRef,
  });

  const scrollY = useTransform(scrollYProgress, [0, 0.33, 1], [0, 1, 2]);

  const background = useTransform(
    scrollY,
    [0, 1, 2],
    [theme.colors.introBgTop, theme.colors.stepOneBg, theme.colors.stepTwoBg],
  );

  const { scrollYProgress: gradientScrollProgressY } = useScroll({
    offset: ['start start', 'end end'],
    target: targetRef,
  });

  const gradientScrollY = useTransform(
    gradientScrollProgressY,
    [0, 0.33, 1],
    [0, 1, 2],
  );

  const gradientOpacity = useTransform(
    gradientScrollY,
    [0, 1, 2, 3],
    [1, 0, 0, 0],
  );

  return (
    <motion.main
      ref={targetRef}
      style={{
        backgroundColor: background,
        zIndex: -10,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Intro />
        <PasoUno />
        <PasoDos />
      </div>
      <motion.div
        animate={{
          backgroundPosition: '0% 0%',
          backgroundSize: '100% 100%',
          transition: {
            duration: firstAnimationDuration,
            ease: 'easeInOut',
          },
        }}
        initial={{
          backgroundPosition: '0% 25%',
          backgroundSize: '100% 400%',
        }}
        style={{
          background: `linear-gradient(360deg, ${theme.colors.introBgTop} 0%, ${theme.colors.introBgBottom} 100%)`,
          backgroundRepeat: 'no-repeat',
          inset: 0,
          opacity: gradientOpacity,
          position: 'fixed',
          zIndex: 0,
        }}
      />
    </motion.main>
  );
};

export default Home;
