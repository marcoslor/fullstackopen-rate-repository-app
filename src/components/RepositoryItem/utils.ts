const formatNumberToK = (n: number) => {
  if (n < 1000) {
    return n;
  }
  return `${(n / 1000).toFixed(1)}k`;
};

export { formatNumberToK };
