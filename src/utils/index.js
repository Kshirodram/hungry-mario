export const generateRandomNumbers = (start, end, count) => {
  const randNumbers = [];
  while (randNumbers.length < count) {
    const randomNum = Math.floor(Math.random() * (end - start + 1) + start);
    if (randNumbers.indexOf(randomNum) === -1) randNumbers.push(randomNum);
  }
  return randNumbers;
};

export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
