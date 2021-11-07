const minimum = 100000000000000;
const maximum = 999999999999999;

const genRand = () => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export default genRand;
