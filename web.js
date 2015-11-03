/**!
 * miwifi-ss-helper - web.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = require('./config');
var db = require('./db');
var app = express();

var rootdir = __dirname;
var viewDir = path.join(rootdir, 'views');
var homeHtml = fs.readFileSync(path.join(viewDir, 'home.html'), 'utf8');

app.use(methodOverride());
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send(homeHtml);
});

app.get('/domain', function (req, res) {
  return res.json({
    success: true,
    domain: db.getDomainList(),
  });
});

app.post('/domain', function (req, res) {
  var domain = req.body.domain;
  var result = {success: false};
  if (!domain) {
    return res.json(result);
  }
  var newList = _.union(db.getDomainList(), [domain]);
  db.setDomainList(newList);
  db.setDnsmasq(newList);
  result.success = true;
  result.domain = newList;
  return res.json(result);
});

app.delete('/domain', function (req, res) {
  var domain = req.body.domain;
  var result = {success: false};
  if (!domain) {
    return res.json(result);
  }
  var newList = _.without(db.getDomainList(), domain);
  db.setDomainList(newList);
  db.setDnsmasq(newList);
  result.success = true;
  result.domain = newList;
  return res.json(result);
});

var server = app.listen(config.webPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
