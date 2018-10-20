const axios = require('axios');

const request = ({url, method, headers = {}}) => {
  return axios({
    method,
    url,
    headers
  });
};

module.exports = request;
