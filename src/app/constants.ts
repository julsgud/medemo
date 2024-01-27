export const SCROLL_TRANSFORM = {
  scrollY: [0, 0.25, 0.8, 1],
  value: [0, 1, 1, 0],
};

export const TEXT_IN = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    transition: {
      mass: 0.1,
      stiffness: 300,
      type: 'spring',
    },
    y: 0,
  },
};

export const slowSpring = {
  damping: 10,
  stiffness: 50,
  type: 'spring',
};

export const smoothSpring = {
  damping: 10,
  stiffness: 100,
  type: 'spring',
};

export const mediumSpring = {
  damping: 10,
  stiffness: 200,
  type: 'spring',
};

export const fastSpring = {
  damping: 10,
  stiffness: 300,
  type: 'spring',
};

export const ANIMATIONS = {
  fastSpring,
  mediumSpring,
  slowSpring,
  smoothSpring,
};

export const ELEMENTS_IN = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    transition: {
      opacity: {
        mass: 0.1,
        stiffness: 100,
        type: 'spring',
      },
      y: {
        damping: 1,
        mass: 0.5,
        stiffness: 100,
        type: 'spring',
      },
    },
    y: 0,
  },
};

export const VARIANTS_IN = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
};
