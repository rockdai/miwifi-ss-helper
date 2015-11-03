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
var dnsmasqConf = require('./dnsmasq/config');
var config = require('./config');

var rootdir = __dirname;
var domainStorage = path.join(rootdir, 'storage', config.storage.domain);
var dnsmasqConfStorage = path.join(rootdir, 'storage', config.storage.dnsmasq);
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
  var str = JSON.stringify(domainList);
  fs.writeFileSync(domainStorage, str, 'utf8');
};

exports.setDnsmasq = function (domainList) {
  var str = dnsmasqConf.make(domainList, dnsServAddr, dnsServPort);
  fs.writeFileSync(dnsmasqConfStorage, str, 'utf8');
};
