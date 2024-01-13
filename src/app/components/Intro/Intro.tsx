import { Section } from '../Section/Section';
import { IntroSvg } from './IntroSvg';

const firstAnimationDuration = 1.5;

const spring = { stiffness: 100, type: 'spring' };

export const Intro = () => {
  return (
    <Section
      animate={{
        backgroundPosition: '0% 0%',
        backgroundSize: '100% 100%',
        transition: {
          duration: firstAnimationDuration,
          ease: 'easeInOut',
        },
      }}
      className="bg-[rgb(var(--section-one-top-rgb))] bg-gradient-to-b from-[rgb(var(--section-one-top-rgb))] to-[rgb(var(--section-one-bottom-rgb))]  "
      initial={{
        backgroundPosition: '0% 25%',
        backgroundSize: '100% 400%',
      }}
      style={{
        backgroundRepeat: 'no-repeat',
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
        />
      </div>
    </Section>
  );
};
