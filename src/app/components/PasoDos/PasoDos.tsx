'use client';
import Silueta from '../../../../public/images/silueta2.webp';
import { SCROLL_TRANSFORM, TEXT_IN, VARIANTS_IN } from '../../constants';
import { AnimatedText } from '../AnimatedText/AnimatedText';
import { Section } from '../Section/Section';
import { Shapes } from './Shapes';
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const animationDuration = 1.5;
const spring = { stiffness: 100, type: 'spring' };

export const ELEMENTS_IN = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    transition: {
      mass: 0.1,
      stiffness: 100,
      type: 'spring',
    },
    y: 0,
  },
};

export const PasoDos = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.5, once: false });

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: [
      [0.7, 1],
      [0.3, 1],
    ],
    target: targetRef,
  });

  const opacity = useTransform(
    scrollYProgress,
    SCROLL_TRANSFORM.scrollY,
    SCROLL_TRANSFORM.value,
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-12 w-100 justify-center">
            <AnimatedText
              className="text-8xl text-[rgb(var(--section-three-text-color-rgb))] font-bold"
              text="2"
            />
            <AnimatedText
              animation={TEXT_IN}
              className="text-6xl text-[rgb(var(--section-three-text-color-rgb))]"
              onAnimationComplete={startBodyAnimation}
              text="DISFRUTA CADA MOMENTO, NO TENEMOS PRISA"
            />
          </div>
          <motion.div
            animate={controls}
            className="flex flex-row justify-around"
            initial="hidden"
            variants={VARIANTS_IN}
          >
            <motion.div
              className="text-2xl max-w-sm font-varela"
              variants={ELEMENTS_IN}
            >
              <p className="text-2xl max-w-sm font-varela">
                Disfruta los pequeños momentos
                <br /> porque{' '}
                <span className="text-section-three-text">
                  queda una vida por recorrer.{' '}
                </span>
                <br />
                <br />
                <span className="text-section-three-text">
                  No tenemos prisa,
                </span>
                <br /> recuerda que siempre
                <br />
                <span className="text-section-three-text">"queda té" </span>
                por disfrutar.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-24 relative"
              variants={ELEMENTS_IN}
            >
              <Image
                alt="Silueta"
                height={320}
                src={Silueta}
                width={320}
              />
              <div className="absolute right-24 top-12">
                <Shapes
                  height="362"
                  width="645"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
