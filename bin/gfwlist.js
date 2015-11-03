#!/usr/bin/env node

/**!
 * 将 gfwlist 转换成带 ipset 的 dnsmasq 规则
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

var gfwlistUrl = 'https://autoproxy-gfwlist.googlecode.com/svn/trunk/gfwlist.txt'
var commentPattern = /^\!|\[|^@@|^\d+\.\d+\.\d+\.\d+/g;
var domainPattern = /([\w\-\_]+\.[\w\.\-\_]+)[\/\*]*/g;

urllib.request(gfwlistUrl, function (err, data, res) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var gfwlist = utility.base64decode(data.toString()).split('\n');
  var domainList = [];
  gfwlist.forEach(function (line) {
    if (!line) {
      return;
    }
    if (!line.match(commentPattern)) {
      if (line.match(domainPattern)) {
        line.match(domainPattern).forEach(function (d) {
          if (d[d.length - 1] === '/') {
            d = d.substring(0, d.length - 1);
          }
          domainList.push(d);
        });
      }
    }
  });
  domainList = _.uniq(domainList);
  db.setDomainList(domainList);
  db.setDnsmasq(domainList);
  console.log('%s domains done!', domainList.length);
  process.exit(0);
});
