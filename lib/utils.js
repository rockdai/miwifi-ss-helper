/**!
 * miwifi-ss-helper - lib/utils.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

exports.isIp = function (str) {
  if (!str) {
    return false;
  }
  return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(str);
};
