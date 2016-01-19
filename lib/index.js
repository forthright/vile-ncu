"use strict";

var fs = require("fs");
var path = require("path");
var vile = require("@brentlintner/vile");
var _ = require("lodash");
var Promise = require("bluebird");

var node_modules = path.join(__dirname, "..", "node_modules");
// HACK
var ncu = path.resolve(path.join(node_modules, ".bin", "ncu"));
var PKG_JSON = "package.json";

var punish = function punish(plugin_data) {
  return new Promise(function (resolve, reject) {
    var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), PKG_JSON), "utf-8"));

    var deps = _.get(pkg, "dependencies", []);
    var dev_deps = _.get(pkg, "devDependencies", []);

    var opts = { args: ["--jsonUpgraded"] };

    vile.spawn(ncu, opts).then(function (stdout) {
      var upgradeable = stdout ? JSON.parse(stdout) : null;

      resolve(_.map(upgradeable, function (version, name) {
        var current = deps[name] || dev_deps[name];
        return vile.issue({
          type: vile.DEP,
          path: PKG_JSON,
          name: name,
          current: current,
          latest: version,
          title: "New dependency release",
          msessage: name + " " + current + " < " + version,
          signature: "ncu::" + name + "::" + current + "::" + version
        });
      }));
    })["catch"](reject);
  });
};

module.exports = {
  punish: punish
};