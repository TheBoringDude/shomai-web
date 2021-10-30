type BlendTypes = 'sb' | 'sw' | string;

const getBlendTypes = (short: BlendTypes) => {
  switch (short) {
    case 'sb': {
      return 'Simple Blend';
    }
    case 'sw': {
      return 'Simple Swap';
    }

    default:
      throw new Error('Unknown Blend Type!');
  }
};

export default getBlendTypes;
export type { BlendTypes };
