"use strict";

var fs = require("fs");
var path = require("path");
var vile = require("@forthright/vile");
var _ = require("lodash");
var Promise = require("bluebird");

var NCU_BIN = "ncu";
var PKG_JSON = "package.json";

var punish = function punish(plugin_data) {
  return new Promise(function (resolve, reject) {
    var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), PKG_JSON), "utf-8"));

    var deps = _.get(pkg, "dependencies", []);
    var dev_deps = _.get(pkg, "devDependencies", []);
    var args = { args: ["-a", "--jsonUpgraded"] };

    vile.spawn(NCU_BIN, args).then(function (spawn_data) {
      var stdout = _.get(spawn_data, "stdout");
      var upgradeable = stdout ? JSON.parse(stdout) : null;

      resolve(_.map(upgradeable, function (version, name) {
        var current = deps[name] || dev_deps[name];
        return vile.issue({
          type: vile.DEP,
          path: PKG_JSON,
          signature: "ncu::" + name + "::" + current + "::" + version,
          dependency: {
            name: name,
            current: current,
            latest: version
          }
        });
      }));
    }).catch(reject);
  });
};

module.exports = {
  punish: punish
};