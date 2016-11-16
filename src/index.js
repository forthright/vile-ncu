let fs = require("fs")
let path = require("path")
let vile = require("@forthright/vile")
let _ = require("lodash")
let Promise = require("bluebird")

const NCU_BIN = "ncu"
const PKG_JSON = "package.json"

let punish = (plugin_data) =>
  new Promise((resolve, reject) => {
    let pkg = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), PKG_JSON), "utf-8"
    ))

    let deps = _.get(pkg, "dependencies", [])
    let dev_deps = _.get(pkg, "devDependencies", [])
    let args = { args: ["--jsonUpgraded"] }

    vile.spawn(NCU_BIN, args)
      .then((stdout) => {
        let upgradeable = stdout ? JSON.parse(stdout) : null

        resolve(_.map(upgradeable, (version, name) => {
          let current = deps[name] || dev_deps[name]
          return vile.issue({
            type: vile.DEP,
            path: PKG_JSON,
            signature: `ncu::${name}::${current}::${version}`,
            dependency: {
              name: name,
              current: current,
              latest: version
            }
          })
        }))
      })
      .catch(reject)
  })

module.exports = {
  punish: punish
}
