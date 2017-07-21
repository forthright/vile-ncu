# vile-ncu [![Circle CI](https://circleci.com/gh/forthright/vile-ncu.svg?style=shield&circle-token=d502ee777f304a41fbfec019f4cd8ee2652d6fa8)](https://circleci.com/gh/forthright/vile-ncu) [![score-badge](https://vile.io/api/v0/projects/vile-ncu/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-ncu) [![security-badge](https://vile.io/api/v0/projects/vile-ncu/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-ncu) [![coverage-badge](https://vile.io/api/v0/projects/vile-ncu/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-ncu) [![dependency-badge](https://vile.io/api/v0/projects/vile-ncu/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-ncu)

A [Vile](https://vile.io) plugin for tracking outdated npm dependencies (via [npm-check-updates](https://github.com/tjunnone/npm-check-updates)).

## Requirements

- [Node.js](http://nodejs.org)

## Installation

    npm i -D vile vile-ncu npm-check-updates

## Config

If you want to use the `--upgradeAll` option, set it in your `.vile.yml`:

```yaml
ncu:
  config:
    all: true
```

## Restrictions

Currently, you need to have your `package.json` in your `pwd`.

## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-ncu/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-ncu/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-ncu/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Architecture

- `src` is es6+ syntax compiled with [Babel](https://babeljs.io)
- `lib` generated js library

## Developing

    cd vile-ncu
    npm install
    npm run dev
    npm test
