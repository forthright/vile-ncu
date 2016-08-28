# vile-ncu [![Circle CI](https://circleci.com/gh/forthright/vile-ncu.svg?style=svg&circle-token=d502ee777f304a41fbfec019f4cd8ee2652d6fa8)](https://circleci.com/gh/forthright/vile-ncu)

[![score-badge](https://vile.io/api/v0/users/brentlintner/vile-ncu/badges/score?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~brentlintner/vile-ncu) [![security-badge](https://vile.io/api/v0/users/brentlintner/vile-ncu/badges/security?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-ncu) [![coverage-badge](https://vile.io/api/v0/users/brentlintner/vile-ncu/badges/coverage?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-ncu) [![dependency-badge](https://vile.io/api/v0/users/brentlintner/vile-ncu/badges/dependency?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-ncu)

A [vile](https://vile.io) plugin for [npm-check-updates](https://github.com/tjunnone/npm-check-updates).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i npm-check-updates --save-dev
    npm i @forthright/vile --save-dev
    npm i @forthright/vile-ncu --save-dev

## Restrictions

Currently, you need to have your `package.json` in your `pwd`.

## Architecture

- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-ncu
    npm install
    npm run dev
    npm test
