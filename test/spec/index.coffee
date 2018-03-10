fs = require "fs"
_ = require "lodash"
path = require "path"
Promise = require "bluebird"
mimus = require "mimus"
plugin = mimus.require "./../../lib", __dirname
chai = require "./../helpers/sinon_chai"
util = require "./../helpers/util"
ncu = mimus.get plugin, "ncu"
expect = chai.expect

describe "punish", ->
  ncu_run_stub = undefined
  pkg_json = "package.json"
  upgraded = foo: "^0.1.6", bar: "~> 4.0"
  pkg_spec =
    dependencies:
      foo: "^0.1.0"
      baz: "^1.0.0"
    devDependencies:
      bar: "~> 3.0"
      baz2: "^2.2.2"

  before ->
    mimus.stub ncu, "run"
    mimus.stub(fs, "readFileSync")

  beforeEach ->
    fs.readFileSync
      .withArgs(pkg_json)
      .returns(new Buffer(JSON.stringify(pkg_spec)))
    ncu_run_stub = new Promise (resolve, reject) ->
      resolve upgraded
    ncu.run.returns ncu_run_stub

  afterEach mimus.reset
  after mimus.restore

  it "converts upgradeable packages to issues", ->
    plugin.punish().should.eventually.eql util.issues

  it "sets default ncu opts", (done) ->
    plugin.punish().should.eventually.be.fulfilled.notify ->
      process.nextTick ->
        ncu.run.should.have.been.calledWith
          packageFile: pkg_json,
          silent: true,
          jsonUpgraded: true,
          upgradeAll: false
        done()
    return

  describe "when ncu fails", ->
    reject_err = undefined

    beforeEach ->
      reject_err = new Error("foobar")
      ncu_run_stub = new Promise (resolve, reject) ->
        reject reject_err
      ncu.run.returns ncu_run_stub

    it "rejects with the error", ->
      plugin.punish().should.be.rejectedWith reject_err

  describe "npm progress log suppression", ->
    it "is done via hack setting a global npm config", ->
      expect(process.env.npm_config_progress).to.equal "false"

  describe "upgradeAll", ->
    plugin_config = config: all: true

    it "sets the corresponding ncu opt", (done) ->
      plugin.punish(plugin_config).should.be.fulfilled.notify ->
        process.nextTick ->
          ncu.run.should.have.been.calledWith
            packageFile: pkg_json
            silent: true
            jsonUpgraded: true
            upgradeAll: true
          done()
      return

  describe "custom package path", ->
    custom_path = path.join "foobar", "package.json"
    plugin_config = config: path: custom_path

    beforeEach ->
      fs.readFileSync
        .withArgs(custom_path)
        .returns(new Buffer(JSON.stringify(pkg_spec)))

    it "sets the corresponding ncu opt", (done) ->
      plugin.punish(plugin_config).should.be.fulfilled.notify ->
        process.nextTick ->
          ncu.run.should.have.been.calledWith(
            packageFile: custom_path
            silent: true
            jsonUpgraded: true
            upgradeAll: false)
          done()
      return

    it "sets the custom path as dep issue paths", ->
      plugin.punish(plugin_config).should.eventually.eql(
        _.map(util.issues, (i) ->
          i.path = custom_path
          i
        ))
