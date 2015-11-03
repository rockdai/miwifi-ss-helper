/**!
 * miwifi-ss-helper - dnsmasq/fgset.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var TEMPLATE = 'ipset=/.{{DOMAIN}}/setmefree';

exports.make = function (domainList) {
  if (!domainList || !domainList.length) {
    return [];
  }
  var result = [];
  for (var i = 0; i < domainList.length; i++) {
    var domain = domainList[i];
    var rule = TEMPLATE.replace('{{DOMAIN}}', domain);
    result.push(rule);
  }
  return result;
};

exports.makePrintable = function (domainList) {
  var result = exports.make(domainList);
  if (!result || !result.length) {
    return '';
  }
  return result.join('\n');
};
