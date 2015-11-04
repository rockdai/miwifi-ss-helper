/**!
 * 获取 gfwlist 的域名列表
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var urllib = require('urllib');
var utility = require('utility');

var gfwlistUrl = 'https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt'
var commentPattern = /^\!|\[|^@@|^\d+\.\d+\.\d+\.\d+/g;
var domainPattern = /([\w\-\_]+\.[\w\.\-\_]+)[\/\*]*/g;

exports.get = function (cb) {
  urllib.request(gfwlistUrl, function (err, data, res) {
    if (err) {
      return cb(err);
    }
    var gfwlist = utility.base64decode(data.toString()).split('\n');
    var domainList = [];
    gfwlist.forEach(function (line) {
      if (!line) {
        return;
      }
      if (!line.match(commentPattern)) {
        if (line.match(domainPattern)) {
          line.match(domainPattern).forEach(function (d) {
            if (d[d.length - 1] === '/') {
              d = d.substring(0, d.length - 1);
            }
            domainList.push(d);
          });
        }
      }
    });

    return cb(null, domainList);
  });
};
