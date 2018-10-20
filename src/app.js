const express = require('express');
const bodyParser = require('body-parser');
const ping = require('./ping');
const stats = require('./stats');

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/ping', ping);

app.get('/', stats);

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
