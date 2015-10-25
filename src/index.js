let fs = require("fs")
let path = require("path")
let vile = require("@brentlintner/vile")
let _ = require("lodash")
let Promise = require("bluebird")

const node_modules = path.join(__dirname, "..", "node_modules")
const ncu = path.resolve(path.join(node_modules, ".bin", "ncu"))
const PKG_JSON = "package.json"

let no_issue = () => [ vile.issue(vile.OK, PKG_JSON) ]

let punish = (plugin_data) => {
  return new Promise((resolve, reject) => {
    let pkg = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), PKG_JSON), "utf-8"
    ))

    let deps = _.get(pkg, "dependencies", [])
    let dev_deps = _.get(pkg, "devDependencies", [])

    let opts = { args: ["--jsonUpgraded"] }

    vile
      .spawn(ncu, opts)
      .then((stdout) => {
        let upgradeable = stdout ? JSON.parse(stdout) : null

        resolve(upgradeable ?
          _.map(upgradeable, (version, name) => {
            return vile.issue(
              vile.WARNING,
              PKG_JSON,
              `${name} ${deps[name] || dev_deps[name]} < ${version}`
            )
          }) : no_issue())
      })
      .catch(reject)
  })
}

module.exports = {
  punish: punish
}
