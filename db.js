/**!
 * miwifi-ss-helper - miwifi-ss-helper/db.js
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
var fgserver = require('./dnsmasq/fgserver');
var fgset = require('./dnsmasq/fgset');
var config = require('./config');

var rootdir = __dirname;
var domainStorage = path.join(rootdir, 'storage', config.storage.domain);
var fgserverStorage = path.join(rootdir, 'storage', config.storage.fgserver);
var fgsetStorage = path.join(rootdir, 'storage', config.storage.fgset);
var dnsServAddr = config.dnsmasq.server;
var dnsServPort = config.dnsmasq.port;

exports.getDomainList = function () {
  var file = '';
  var json = [];
  try {
    file = fs.readFileSync(domainStorage, 'utf8');
    json = JSON.parse(file);
  } catch (ex) {
    console.log(ex);
  }
  return json;
};

exports.setDomainList = function (domainList) {
  var string = JSON.stringify(domainList);
  fs.writeFileSync(domainStorage, string, 'utf8');
};

exports.setDnsmasq = function (domainList) {
  var fgserverStr = fgserver.makePrintable(domainList, dnsServAddr, dnsServPort);
  fs.writeFileSync(fgserverStorage, fgserverStr, 'utf8');
  var fgsetStr = fgset.makePrintable(domainList);
  fs.writeFileSync(fgsetStorage, fgsetStr, 'utf8');
};
