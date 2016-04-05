# vile-ncu

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
