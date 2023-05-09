import axios from "axios";

export const httpRequest = async (config) => {
  const data = await axios(process.env.REACT_APP_SERVER + config.url, {
    method: config.method,
    data: config.data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return data;
};
