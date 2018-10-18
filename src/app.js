const express = require('express');

const app = express();
const port = 4000;

app.get('/healthcheck', (req, res) => res.send('ok'));

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
