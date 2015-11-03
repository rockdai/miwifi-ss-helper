/**!
 * miwifi-ss-helper - app.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var config = require('./config');
var webApp = require('./web');
var path = require('path');
var fs = require('fs');
var rootdir = __dirname;

// Check system path
[
  '/etc/init.d/dnsmasq',
  '/etc/dnsmasq.d/gfwlist.conf',
].forEach(function (item) {
  if (!fs.existsSync(item)) {
    console.error(item + ' is required!');
    process.exit(1);
  }
});

// Init storage
var storageDir = path.join(rootdir, 'storage');
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

// Lunch web app
var server = webApp.listen(config.webPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});

