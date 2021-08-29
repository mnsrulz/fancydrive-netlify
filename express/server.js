'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const pageview = require('../viewsout/index');

// Home route.
router.get('/*', (req, res) => {
  const page = req.url.split('/').pop() || '/';
  res.send(pageview({
    results: [{ title: 'item1', link: '/pg1' }, { title: 'item2', link: '/pg2' }],
    directory: page
  }));
});

app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
