/**!
 * miwifi-ss-helper - test/dnsmasq/config.test.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var dnsmasqConf = require('../../dnsmasq/config');
var mockDomain = [
  'google.com',
  'google.com.hk',
  'gstatic.com',
  'ggpht.com',
  'googleusercontent.com',
];
var mockServer = '208.67.222.222';
var mockPort = 443;

describe('dnsmasq/config.test.js', function () {

  describe('#make', function () {
    it('should return empty string when invalid param', function () {
      dnsmasqConf.make().should.equal('');
      dnsmasqConf.make(mockDomain).should.equal('');
      dnsmasqConf.make(mockDomain, mockServer).should.equal('');
      dnsmasqConf.make([], mockServer, mockPort).should.equal('');
    });
    it('should work', function () {
      var r = dnsmasqConf.make(mockDomain, mockServer, mockPort);
      r.should.be.a.String;
      r.split('\n').length.should.equal(mockDomain.length * 2);
    });
  });
});
