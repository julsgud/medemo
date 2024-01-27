'use client';
import Silueta from '../../../../public/images/silueta2.webp';
import { Section } from '../Section/Section';
import { Shapes } from './Shapes';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const animationDuration = 1.5;
const spring = { stiffness: 100, type: 'spring' };

export const PasoDos = () => {
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
            <h2 className="text-8xl text-section-three-text font-bold">1</h2>
            <motion.h2 className="text-6xl text-section-three-text ">
              DISFRUTA CADA MOMENTO, <br /> NO TENEMOS PRISA
            </motion.h2>
          </div>
          <div className="flex flex-row gap-48 items-center">
            <p className="text-2xl max-w-sm font-varela">
              Disfruta los pequeños momentos
              <br /> porque{' '}
              <span className="text-section-three-text">
                queda una vida por recorrer.{' '}
              </span>
              <br />
              <br />
              <span className="text-section-three-text">No tenemos prisa,</span>
              <br /> recuerda que siempre
              <br />
              <span className="text-section-three-text">"queda té" </span>
              por disfrutar
            </p>

            <div className="flex flex-col gap-24 relative">
              <Image
                alt="Silueta"
                height={420}
                src={Silueta}
                width={420}
              />
              <div className="absolute right-20 top-24">
                <Shapes
                  height="453.6"
                  width="806.4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
