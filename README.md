[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/postmessager.svg?style=flat-square
[npm-url]: https://npmjs.org/package/postmessager
[travis-image]: https://travis-ci.com/saqqdy/postmessager.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/postmessager
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/postmessager.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/postmessager?branch=master
[david-image]: https://img.shields.io/david/saqqdy/postmessager.svg?style=flat-square
[david-url]: https://david-dm.org/saqqdy/postmessager
[snyk-image]: https://snyk.io/test/npm/postmessager/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/postmessager
[download-image]: https://img.shields.io/npm/dm/postmessager.svg?style=flat-square
[download-url]: https://npmjs.org/package/postmessager

# **完整文档请查阅： [API 完整文档](./docs/classes/default.md)**

# 介绍

postmessager

# 安装教程

```shell
# 通过npm安装
npm install --save postmessager
# 或者通过yarn安装
yarn add postmessager
```

## 通过 import 引入模块的方式

```js
// 在你的.vue或者main.js里面写上import
import PostMessager from 'postmessager'
```

## 使用文件引入的方式

1. 通过 require 引入

```js
// 在你的main.js文件里面加上下面这一行
const PostMessager = require('postmessager')
```

2. html 静态页直接使用

```html
<!-- 在你的html代码上加上script标签，使用CDN链接引入 -->
<script src="https://unpkg.com/postmessager@0.1.0/lib/index.umd.js"></script>
```

# 使用

## 1. 在 vue 中使用

```vue
<script>
import PostMessager from 'postmessager'

export default {
    data() {
        return {
            messager: null
        }
    },
    created() {
        this.messager = new PostMessager(this, 'invokeCustomEvent')
        this.messager.subcribe('getQuery', this.getQuery)
    },
    methods: {
        getQuery(data) {
            console.log(data)
        }
    }
}
</script>
```

## 2. js 项目中使用

```js
const messager = new PostMessager()
messager.subcribe('getQuery', getQuery)
messager.postMessageUp('actionName', {})
messager.postMessageDown('iframeName', 'actionName', {})

function getQuery(data) {
    console.log(data)
}
```

# 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

# 我的相关

-   **_使用_** _Readme_XXX.md_ 来支持不同的语言，`例如` _Readme_en.md, Readme_zh.md_
-   我的 Github：[https://github.com/saqqdy](https://github.com/saqqdy)
-   我的 npm：[https://npmjs.com/~saqqdy](https://npmjs.com/~saqqdy)
-   我的个人网站 [http://www.saqqdy.com](http://www.saqqdy.com)
