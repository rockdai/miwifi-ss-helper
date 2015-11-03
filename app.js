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

var path = require('path');
var fs = require('fs');
var rootdir = __dirname;

var SYS_PATH = {
  dnsmasq: '/etc/init.d/dnsmasq',
  fgserver: '/etc/dnsmasq.d/fgserver.conf',
  fgset: '/etc/dnsmasq.d/fgset.conf',
};

// Check system path
for (var k in SYS_PATH) {
  if (SYS_PATH.hasOwnProperty(k)) {
    if (!fs.existsSync(SYS_PATH[k])) {
      console.error(SYS_PATH[k] + ' is required!');
      process.exit(1);
    }
  }
}

// Init storage dir
var storageDir = path.join(rootdir, 'storage');
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

