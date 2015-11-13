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
var utils = require('../lib/utils');
var TEMP_SERV = 'server=/.{{DOMAIN}}/{{SERVER_ADDR}}{{SERVER_PORT}}';
var TEMP_IPST = 'ipset=/.{{DOMAIN}}/setmefree';

exports.make = function (domainList, server, port) {
  if (!domainList || !domainList.length || !server) {
    return '';
  }
  port = port || '';
  var result = [];
  for (var i = 0; i < domainList.length; i++) {
    var domain = domainList[i];
    if (!utils.isIp(domain)) {
      var portStr = '';
      if (port) {
        portStr = '#' + port;
      }
      result.push(
         TEMP_SERV.replace(/\{\{DOMAIN\}\}/g, domain)
                  .replace(/\{\{SERVER_ADDR\}\}/g, server)
                  .replace(/\{\{SERVER_PORT\}\}/, portStr)
      );
    }
    result.push(TEMP_IPST.replace(/\{\{DOMAIN\}\}/g, domain));
  }
  return result.join('\n');
};
