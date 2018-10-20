const config = require('../config/config');
const async = require('async');
const request = require('./request');

const setDefaults = ({ url, method, headers }) => {
  return {
    url,
    method: method || config.default.method,
    headers: Object.assign(config.default.headers, headers || {}),
  };
};

// create a queue object with concurrency 2
const queue = async.queue((task, callback) => {
  const { url, method, headers } = setDefaults(task);

  console.log(`[SENDING] [${method}] ${url}`);

  request({ url, method, headers })
    .then((response) => {
      console.log(`[OK] [${method}] ${url}`);
      callback(null, {
        responseHeaders: response.headers,
        responseData: response.data,
        requestHeaders: response.request._headers
      });
    })
    .catch((error) => {
      console.log(`[FAIL] [${method}] ${url}`);
      console.log(` => ${(error && error.response && error.response.status || error)}`);
      callback(error, { url, method, headers, status: error && error.response && error.response.status});
    });
}, config.concurrency);

// assign a callback
queue.drain = function() {
  console.log('All items have been processed');
};

module.exports = queue;
