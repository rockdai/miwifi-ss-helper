#!/usr/bin/env node

/**!
 * 将土行孙的 pac 转换成带 ipset 的 dnsmasq 规则
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var urllib = require('urllib');
var utility = require('utility');
var _ = require('lodash');
var db = require('../db');
var gfwList = require('../lib/gfwlist');
var pacList = require('../pac_list');

var pacDomains = [];
for (var d in pacList) {
  if (pacList.hasOwnProperty(d)) {
    pacDomains.push(d);
  }
}
console.log('pac domains: %s', pacDomains.length);

gfwList.get(function (err, gfwDomains) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('gfwlist domains: %s', gfwDomains.length);
  var result = _.union(pacDomains, gfwDomains);
  console.log('union domains: %s', result.length);
  db.setDomainList(result);
  db.setDnsmasq(result);
  console.log('done!');
  process.exit(0);
});
