/**!
 * miwifi-ss-helper - config.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

module.exports = {
  webPort: 8080,
  debug: true,
  dnsmasq: {
    server: '208.67.222.222',
    port: 443,
  },
  storage: {
    domain: 'domain.json',
    dnsmasq: 'dnsmasq.conf',
  },
};
