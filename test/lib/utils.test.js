/**!
 * miwifi-ss-helper - test/lib/utils.test.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var utils = require('../../lib/utils');

describe('lib/utils.test.js', function () {

  describe('#isIp', function () {
    it('should work', function () {
      utils.isIp().should.be.false;
      utils.isIp('').should.be.false;
      utils.isIp('1234').should.be.false;
      utils.isIp('123hello.com').should.be.false;
      utils.isIp('123.123.123.123').should.be.true;
      utils.isIp('8.8.8.8').should.be.true;
    });
  });
});
