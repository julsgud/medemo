'use client';
import { theme } from '../../theme';
import { Section } from '../Section/Section';
import { IntroSvg } from './IntroSvg';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const firstAnimationDuration = 1.5;
const spring = { stiffness: 100, type: 'spring' };

export const Intro = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: [
      [0.3, 0.3],
      [0.75, 0],
    ],
    target: targetRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { scrollYProgress: bottomColorScrollYProgress } = useScroll({
    offset: [
      [0.3, 0.3],
      [0.75, 0],
    ],
    target: targetRef,
  });

  const scrollY = useTransform(bottomColorScrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      ref={targetRef}
      style={{
        opacity,
      }}
    >
      <div className="flex justify-center align-center h-full">
        <IntroSvg
          animate={{
            opacity: 1,
            transition: {
              delay: firstAnimationDuration,
              duration: firstAnimationDuration / 2,
              ...spring,
            },
            y: 0,
          }}
          className="w-[500px]"
          initial={{
            opacity: 0,
            y: 100,
          }}
          style={{
            opacity,
          }}
        />
      </div>
    </Section>
  );
};
