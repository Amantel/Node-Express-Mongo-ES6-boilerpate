const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const bearerToken = require('express-bearer-token');

const serverSettings = require('./server_settings');

const db = require('./db');

const port = process.env.PORT || serverSettings.portAPI || 5001;

const app = express();
app.use(cors());

app.use(bearerToken());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);

app.use(require('./controllers'));

app.use((req, res) => res
  .status(404)
  .json({ error: 'Endpoint not found', hint: 'Check the API documentation' })
  .end());

app.use((err, req, res) => {
  console.error('*******');
  console.error(err.stack);
  if (req) {
    console.error(req.originalUrl);
    console.error('req.params');
    console.error(JSON.stringify(req.params));
    console.error('req.body');
    console.error(JSON.stringify(req.body));
    console.error(req.path);
  }
  console.error('*******');
  return res
    .status(404)
    .json({ error: 'Something when wrong' })
    .end();
});

db.connect((err) => {
  if (err) {
    console.error('Mongo Connect Error', err);
    process.exit(2);
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`connected to DB: ${serverSettings.appDB}`);
    console.log(`mongodb: ${serverSettings.databaseConnectionURL}`);
    console.log(`env: ${process.env.NODE_ENV || 'default'}`);
    app.emit('appStarted');
  });
});

module.exports = app; // for testing
