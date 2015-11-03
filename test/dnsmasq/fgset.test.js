/**!
 * miwifi-ss-helper - test/dnsmasq/fgset.test.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var fgset = require('../../dnsmasq/fgset');
var mockDomain = [
  'google.com',
  'google.com.hk',
  'gstatic.com',
  'ggpht.com',
  'googleusercontent.com',
];

describe('dnsmasq/fgset.test.js', function () {
  describe('#make', function () {
    it('should return [] when invalid param', function () {
      fgset.make().should.eql([]);
      fgset.make([]).should.eql([]);
    });
  });
  describe('#makePrintable', function () {
    it('should return empty string when invalid param', function () {
      fgset.makePrintable().should.equal('');
      fgset.makePrintable([]).should.equal('');
    });
    it('should work', function () {
      var r = fgset.makePrintable(mockDomain);
      r.should.be.a.String;
      r.split('\n').length.should.equal(mockDomain.length);
    });
  });
});
