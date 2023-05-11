export const generateUniqueId = (str) => {
  const randomStr = Math.random().toString(36).substring(2, 8);
  return str + "-" + randomStr;
};
