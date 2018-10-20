const queue = require('./queue');

const ping = (req, res) => {
  const { urls, method, headers, priority } = req.body;

  if (!urls) {
    res.status(422);
    res.send('Missing urls field');
    return;
  }

  if (!Array.isArray(urls) || urls.length === 0) {
    res.status(422);
    res.send('Urls field must be non empty array');
    return;
  }

  const tasks = urls.map(url => {
    return {
      url,
      method,
      headers,
    }
  });


  const debug = typeof req.query.debug !== 'undefined' && urls.length === 1;

  const priorityMethod = priority ? 'unshift' : 'push';

  queue[priorityMethod](tasks, (err, data = {}) => {
    if (!debug) {
      return;
    }

    console.log(err);
    console.log(JSON.stringify(data, null, 2));

    res.write('Error:\n');
    res.write(err ? err.message : 'null');
    res.write('\nRequest info:\n');
    res.write(JSON.stringify(data, null, 2));
    res.end();
  });

  // if debug is enabled response is async
  if (debug) {
    return;
  }

  res.json({
    status: 'ok',
    queued: queue.length(),
  });
};

module.exports = ping;
