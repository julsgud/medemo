'use client';
import Silueta from '../../../../public/images/silueta.webp';
import { ANIMATIONS, ELEMENTS_IN, TEXT_IN, VARIANTS_IN } from '../../constants';
import { AnimatedText } from '../AnimatedText/AnimatedText';
import { Section } from '../Section/Section';
import { Figures } from './Figures';
import { Shapes } from './Shapes';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export const PasoUno = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.5, once: false });

  const startBodyAnimation = () => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  };

  return (
    <Section ref={ref}>
      <div className="flex justify-center align-center h-full p-[12%]">
        <motion.div className="flex flex-col gap-4">
          <div className="flex flex-row gap-12 w-100 justify-center">
            <AnimatedText
              className="text-8xl text-[rgb(var(--section-two-text-color-rgb))] font-bold"
              text="1"
            />
            <AnimatedText
              animation={TEXT_IN}
              className="text-6xl text-[rgb(var(--section-two-text-color-rgb))]"
              onAnimationComplete={startBodyAnimation}
              text="SIÉNTETE LIBRE Y SEGUR@ DE TI MISM@"
            />
          </div>
          <motion.div
            animate={controls}
            className="flex flex-row justify-around px-8"
            initial="hidden"
            variants={{
              ...VARIANTS_IN,
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 1,
                },
              },
            }}
          >
            <motion.div
              className="flex flex-col gap-4 relative bottom-16"
              variants={ELEMENTS_IN}
            >
              <div className="absolute -right-24 top-8">
                <Shapes
                  height="367.416"
                  width="653.184"
                />
              </div>
              <Image
                alt="Silueta"
                height={420}
                src={Silueta}
                width={420}
              />
            </motion.div>
            <motion.div
              className="flex flex-col gap-4"
              variants={{
                ...ELEMENTS_IN,
                visible: {
                  ...ELEMENTS_IN.visible,
                  transition: {
                    opacity: ANIMATIONS.fastSpring,
                    y: ANIMATIONS.mediumSpring,
                  },
                },
              }}
            >
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
              <div className="flex flex-col items-center">
                <Figures width={320} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};
