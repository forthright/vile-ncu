"use strict";

var fs = require("fs");
var vile = require("vile");
var _ = require("lodash");
var ncu = require("npm-check-updates");

// HACK: you can see a progress bar when using ncu's lib
process.env.npm_config_progress = false;

var PKG_JSON = "package.json";

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

var punish = function punish(plugin_data) {
  var pkg_path = _.get(plugin_data, "config.path", PKG_JSON);
  var pkg = JSON.parse(fs.readFileSync(pkg_path).toString());

  return ncu.run(ncu_opts(plugin_data, pkg_path)).then(into_issues(pkg, pkg_path));
};

module.exports = {
  punish: punish
};