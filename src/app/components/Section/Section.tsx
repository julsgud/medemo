'use client';
import { motion, type MotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

type SectionProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export const Section = forwardRef<HTMLDivElement, SectionProps & MotionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.section
        {...props}
        className={`h-screen w-full ${className}`}
        ref={ref}
      >
        {children}
      </motion.section>
    );
  },
);
