/* eslint-disable react/no-array-index-key */
import { motion, useAnimation, useInView, type Variant } from 'framer-motion';
import { useEffect, useRef } from 'react';

type AnimatedTextProps = {
  readonly animation?: {
    hidden: Variant;
    visible: Variant;
  };
  readonly className?: string;
  readonly onAnimationComplete?: () => void;
  readonly once?: boolean;
  readonly repeatDelay?: number;
  readonly text: string | string[];
  readonly variants?: {
    hidden: Variant;
    visible: Variant;
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.01,
    },
    y: 0,
  },
};

const defaultVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const AnimatedText = ({
  animation = defaultAnimations,
  className,
  onAnimationComplete,
  once,
  repeatDelay,
  text,
  variants = defaultVariants,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start('visible');
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start('hidden');
          controls.start('visible');
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start('hidden');
    }

    return () => clearTimeout(timeout);
  }, [controls, isInView, repeatDelay]);

  return (
    <span ref={ref}>
      <span className="sr-only">{textArray.join(' ')}</span>
      <motion.span
        animate={controls}
        aria-hidden
        className={className}
        initial="hidden"
        onAnimationComplete={onAnimationComplete}
        variants={variants ?? defaultVariants}
      >
        {textArray.map((line, lineIndex) => (
          <span
            className="block"
            key={`${line}-${lineIndex}`}
          >
            {line.split(' ').map((word, wordIndex) => (
              <span
                className="inline-block"
                key={`${word}-${wordIndex}`}
              >
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    className="inline-block"
                    key={`${char}-${charIndex}`}
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
};
