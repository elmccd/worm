const queue = require('./queue');

const stats = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`Queue length = ${queue.length()}\n`);
  res.write(`Processing = ${queue.running()}\n`);
  res.end();
};

module.exports = stats;
