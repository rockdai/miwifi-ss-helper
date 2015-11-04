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

var gfwList = require('../lib/gfwlist');
var _ = require('lodash');
var db = require('../db');

gfwList.get(function (err, domainList) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  domainList = _.uniq(domainList);
  db.setDomainList(domainList);
  db.setDnsmasq(domainList);
  console.log('%s domains done!', domainList.length);
  process.exit(0);
});
