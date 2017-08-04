issues = [
  {
    "dependency": {
      "current": "^0.1.0"
      "latest": "^0.1.6"
      "name": "foo"
    }
    "path": "package.json"
    "signature": "ncu::foo::^0.1.0::^0.1.6"
    "type": "dependency"
  }
  {
    "dependency": {
      "current": "~> 3.0"
      "latest": "~> 4.0"
      "name": "bar"
    }
    "path": "package.json"
    "signature": "ncu::bar::~> 3.0::~> 4.0"
    "type": "dependency"
  }
]

module.exports =
  issues: issues
