const mapArrayToObject = array => (array.reduce((acc, cur, i) => {
  acc[i] = cur;
  return acc;
}, {}));

export default mapArrayToObject;
