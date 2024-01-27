'use client';
import Silueta from '../../../../public/images/silueta.webp';
import { Section } from '../Section/Section';
import { Figures } from './Figures';
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
          <div className="flex flex-row gap-48 items-center">
            <div className="flex flex-col gap-4 relative">
              <Image
                alt="Silueta"
                height={420}
                src={Silueta}
                width={420}
              />

              <div className="absolute -right-24 top-8">
                <Shapes
                  height="367.416"
                  width="653.184"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl max-w-sm font-varela">
                Si estás{' '}
                <span className="text-section-two-text">hasta la madre </span>
                de estar mal, es momento de sentirte y verte bien.
                <br />
                <br />
                Aprovecha cada momento para ser feliz contigo y{' '}
                <span className="text-section-two-text">no me jodas</span> con
                que no se puede. INTÉNTALO.
              </p>
              <div>
                <Figures width={320} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
