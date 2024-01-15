'use client';
import Silueta from '../../../../public/images/silueta.png';
import { Section } from '../Section/Section';
import { Shapes } from './Shapes';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const animationDuration = 1.5;
const spring = { stiffness: 100, type: 'spring' };

export const PasoUno = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.9,
  });

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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-12 w-100 justify-center">
            <h2 className="text-8xl text-[rgb(var(--section-two-text-color-rgb))] font-bold">
              1
            </h2>
            <motion.h2 className="text-6xl text-[rgb(var(--section-two-text-color-rgb))] ">
              SIÉNTETE LIBRE <br /> Y SEGUR@ DE TI MISM@
            </motion.h2>
          </div>
          <div className="flex flex-row gap-32 items-center">
            <Image
              alt="Silueta"
              height={420}
              src={Silueta}
              width={420}
            />
            <p className="text-2xl max-w-sm font-varela">
              Si estás{' '}
              <span className="text-section-two-text">hasta la madre </span>
              de estar mal, es momento de sentirte y verte bien.
              <br />
              <br />
              Aprovecha cada momento para ser feliz contigo y{' '}
              <span className="text-section-two-text">no me jodas</span> con que
              no se puede. INTÉNTALO.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
