const fs = require("fs")
const vile = require("vile")
const _ = require("lodash")
const ncu = require("npm-check-updates")

// HACK: you can see a progress bar when using ncu's lib
process.env.npm_config_progress = false

const PKG_JSON = "package.json"

const into_issues = (pkg, pkg_path) => (upgraded) => {
  const deps = _.get(pkg, "dependencies", [])
  const dev_deps = _.get(pkg, "devDependencies", [])
  return _.map(upgraded, (version, name) => {
    const current = deps[name] || dev_deps[name]
    return vile.issue({
      type: vile.DEP,
      path: pkg_path,
      signature: `ncu::${name}::${current}::${version}`,
      dependency: {
        name: name,
        current: current,
        latest: version
      }
    })
  })
}

const ncu_opts = (plugin_data, pkg_path) => {
  return {
    packageFile: pkg_path,
    silent: true,
    jsonUpgraded: true,
    upgradeAll: _.get(plugin_data, "config.all", false)
  }
}

const punish = (plugin_data) => {
  const pkg_path = _.get(plugin_data, "config.path", PKG_JSON)
  const pkg = JSON.parse(fs.readFileSync(pkg_path).toString())

  return ncu
    .run(ncu_opts(plugin_data, pkg_path))
    .then(into_issues(pkg, pkg_path))
}

module.exports = {
  punish: punish
}
