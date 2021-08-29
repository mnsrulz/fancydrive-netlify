'use strict';
const app = require('./express/server');
const path = require('path');
const pugm = require('pug');
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Local request handlers.
app.get('/*', (req, res) => {
  const page = req.url.split('/').pop() || '/';
  res.render('index', {
    results: [{ title: 'item1', link: '/pg1' }, { title: 'item2', link: '/pg2' }],
    directory: page
  });
});

// Route Files.
// let page1 = require('./routes/page1');
// let page2 = require('./routes/page2');
// let page3 = require('./routes/page3');
// let page4 = require('./routes/page4');
// app.use('/page1', page1);
// app.use('/page2', page2);
// app.use('/page3', page3);
// app.use('/page4', page4);

// Start Server.
let port = 3005;
app.listen(port, function(){
  console.log(`Server started on port ${port}...`);
});