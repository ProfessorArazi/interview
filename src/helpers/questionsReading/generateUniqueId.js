export const generateUniqueId = (str) => {
  let randomStr = "";
  while (randomStr.length < 6) {
    randomStr += Math.random().toString(36).substring(2, 8);
  }
  return str + "-" + randomStr.slice(0, 6);
};
