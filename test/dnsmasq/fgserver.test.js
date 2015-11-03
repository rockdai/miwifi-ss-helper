/**!
 * miwifi-ss-helper - test/dnsmasq/fgserver.test.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var fgserver = require('../../dnsmasq/fgserver');
var mockDomain = [
  'google.com',
  'google.com.hk',
  'gstatic.com',
  'ggpht.com',
  'googleusercontent.com',
];
var mockServer = '208.67.222.222';
var mockPort = 443;

describe('dnsmasq/fgserver.test.js', function () {
  describe('#make', function () {
    it('should return [] when invalid param', function () {
      fgserver.make().should.eql([]);
      fgserver.make(mockDomain).should.eql([]);
      fgserver.make(mockDomain, mockServer).should.eql([]);
      fgserver.make([], mockServer, mockPort).should.eql([]);
    });
  });
  describe('#makePrintable', function () {
    it('should return empty string when invalid param', function () {
      fgserver.makePrintable().should.equal('');
      fgserver.makePrintable(mockDomain).should.equal('');
      fgserver.makePrintable(mockDomain, mockServer).should.equal('');
      fgserver.makePrintable([], mockServer, mockPort).should.equal('');
    });
    it('should work', function () {
      var r = fgserver.makePrintable(mockDomain, mockServer, mockPort);
      r.should.be.a.String;
      r.split('\n').length.should.equal(mockDomain.length);
    });
  });
});
