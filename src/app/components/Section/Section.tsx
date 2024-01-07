import { ReactNode } from 'react';

interface SectionProps {
  className?: string;
  children: ReactNode;
}

export const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <section {...props} className={`h-screen ${className}`}>
      {children}
    </section>
  );
};


