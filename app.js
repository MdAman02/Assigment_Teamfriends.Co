const express = require('express');
const helmet = require('helmet');
const routes = require('./index.route')

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use((req, res, next) => {
  if (!req.is('application/json') )
    next('Wrong Content-Type header')
});

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: `Request Failed: ${err.message}`,    
  })
});

exports.server = app;
