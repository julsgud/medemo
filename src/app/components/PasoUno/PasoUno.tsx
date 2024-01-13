'use client';
import { Section } from '../Section/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const animationDuration = 1.5;
const spring = { stiffness: 100, type: 'spring' };

export const PasoUno = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.9,
  });

  console.log('isInView', isInView);

  return (
    <Section
      animate={{
        backgroundPosition: isInView ? '0% 100%' : '0% 0%',
        backgroundSize: isInView ? '100% 300%' : '100% 100%',
        transition: {
          duration: animationDuration / 4,
          ease: 'easeInOut',
        },
      }}
      className="bg-[rgb(var(--section-one-bottom-rgb))] bg-gradient-to-b from-[rgb(var(--section-one-bottom-rgb))] to-[rgb(var(--section-two-bottom-rgb))]"
      ref={ref}
      style={{
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex justify-center align-center h-full p-[12%]">
        <div className="flex flex-row gap-12">
          <h2 className="text-8xl text-[rgb(var(--section-two-text-color-rgb))] font-bold">
            1
          </h2>
          <h2 className="text-6xl text-[rgb(var(--section-two-text-color-rgb))] ">
            SIÉNTETE LIBRE <br /> Y SEGUR@ DE TI MISM@
          </h2>
        </div>
      </div>
    </Section>
  );
};
