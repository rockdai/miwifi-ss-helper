/**!
 * miwifi-ss-helper - dnsmasq/fgserver.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var TEMPLATE = 'server=/.{{DOMAIN}}/{{SERVER_ADDR}}#{{SERVER_PORT}}';

exports.make = function (domainList, server, port) {
  if (!domainList || !domainList.length || !server || !port) {
    return [];
  }
  var result = [];
  for (var i = 0; i < domainList.length; i++) {
    var domain = domainList[i];
    var rule = TEMPLATE
                .replace('{{DOMAIN}}', domain)
                .replace('{{SERVER_ADDR}}', server)
                .replace('{{SERVER_PORT}}', port);
    result.push(rule);
  }
  return result;
};

exports.makePrintable = function (domainList, server, port) {
  var result = exports.make(domainList, server, port);
  if (!result || !result.length) {
    return '';
  }
  return result.join('\n');
};
