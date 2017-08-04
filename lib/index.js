"use strict";

var fs = require("fs");
var path = require("path");
var vile = require("vile");
var _ = require("lodash");
var ncu = require("npm-check-updates");
var Promise = require("bluebird");

// HACK: you can see a progress bar when using ncu's lib
process.env.npm_config_progress = false;

var PKG_JSON = "package.json";

var cwd_pkg = function cwd_pkg() {
  return path.join(process.cwd(), PKG_JSON);
};

var into_issues = function into_issues(pkg, pkg_path) {
  return function (upgraded) {
    var deps = _.get(pkg, "dependencies", []);
    var dev_deps = _.get(pkg, "devDependencies", []);
    return _.map(upgraded, function (version, name) {
      var current = deps[name] || dev_deps[name];
      return vile.issue({
        type: vile.DEP,
        path: pkg_path,
        signature: "ncu::" + name + "::" + current + "::" + version,
        dependency: {
          name: name,
          current: current,
          latest: version
        }
      });
    });
  };
};

var ncu_opts = function ncu_opts(plugin_data, pkg_path) {
  return {
    packageFile: pkg_path,
    silent: true,
    jsonUpgraded: true,
    upgradeAll: _.get(plugin_data, "config.all", false)
  };
};

var package_json_data = function package_json_data(plugin_data) {};

var punish = function punish(plugin_data) {
  var pkg_path = _.get(plugin_data, "config.path", cwd_pkg());
  var pkg = JSON.parse(fs.readFileSync(pkg_path).toString());

  return ncu.run(ncu_opts(plugin_data, pkg_path)).then(into_issues(pkg, pkg_path));
};

module.exports = {
  punish: punish
};