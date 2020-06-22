# gulp-workflow

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ yarn add gulp-workflow

# or npm
$ npm install gulp-workflow
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const gulpWorkflow = require('gulp-workflow')
const result = gulpWorkflow('zce')
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### gulpWorkflow(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; 孙伟 <mick.sunwei@qq.com>



[downloads-image]: https://img.shields.io/npm/dm/gulp-workflow.svg
[downloads-url]: https://npmjs.org/package/gulp-workflow
[version-image]: https://img.shields.io/npm/v/gulp-workflow.svg
[version-url]: https://npmjs.org/package/gulp-workflow
[license-image]: https://img.shields.io/github/license/zce/gulp-workflow.svg
[license-url]: https://github.com/zce/gulp-workflow/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/gulp-workflow.svg
[dependency-url]: https://david-dm.org/zce/gulp-workflow
[devdependency-image]: https://img.shields.io/david/dev/zce/gulp-workflow.svg
[devdependency-url]: https://david-dm.org/zce/gulp-workflow?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
