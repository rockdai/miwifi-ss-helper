/**!
 * miwifi-ss-helper - dnsmasq/config.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var TEMPLATE =  'server=/.{{DOMAIN}}/{{SERVER_ADDR}}#{{SERVER_PORT}}\n' +
                'ipset=/.{{DOMAIN}}/setmefree';

exports.make = function (domainList, server, port) {
  if (!domainList || !domainList.length || !server || !port) {
    return '';
  }
  var result = [];
  for (var i = 0; i < domainList.length; i++) {
    var domain = domainList[i];
    var rule = TEMPLATE
                .replace(/\{\{DOMAIN\}\}/g, domain)
                .replace(/\{\{SERVER_ADDR\}\}/g, server)
                .replace(/\{\{SERVER_PORT\}\}/, port);
    result.push(rule);
  }
  return result.join('\n');
};
