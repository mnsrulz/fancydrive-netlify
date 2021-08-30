'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const pageview = require('../viewsout/index');
const fancydrivewrapper = require('../services/fancydrive');

// Home route.
router.get('/watchfire/*', async (req, res) => {
  const baseUrl = '/.netlify/functions/server/watchfire/';
  console.log(`RequestUrl: ${req.url}`);
  const nexturl = req.url === '/watchfire/' ? `/watchfire/0:/me/` : req.url;
  const page = req.url.split('/').pop() || '/';
  const items = await fancydrivewrapper(nexturl.substr(11));
  items.filter(x => x.isFolder).forEach(x => x.link = `${baseUrl}${x.link}`);
  res.send(pageview({
    results: items,
    directory: page
  }));
});

app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
