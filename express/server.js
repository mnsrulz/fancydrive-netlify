'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const pageview = require('../viewsout/index');
const fancydrivewrapper = require('../services/fancydrive');
const env = require('../configs/env');
const watchfireBaseUrl = env.watchfire;

// Home route.
router.get('/watchfire/*', async (req, res) => {
  const baseUrl = '/.netlify/functions/server/watchfire/';
  console.log(`RequestUrl: ${req.url}`);
  const nexturl = req.url === '/watchfire/' ? `/watchfire/0:/me/` : req.url;
  const nurl1 = nexturl.substr(11);
  if (req.url.endsWith('/')) {
    const page = req.url.split('/').pop() || '/';
    const items = await fancydrivewrapper.parseListing(nurl1);
    if (items) {
      items
        //.filter(x => x.isFolder)
        .forEach(x => x.link = `${baseUrl}${x.link}`);
      res.send(pageview({
        results: items,
        directory: page
      }));
    } else {
      res.status(500).send('unable to get content error occurred');
    }
  } else {
    console.log('not a directory... so redirecting to the hosting site');
    const streamBaseUrl = await fancydrivewrapper.extractStreamBaseUrl();
    res.redirect(`${streamBaseUrl}/${nurl1}`);
  }
});

app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
