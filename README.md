# Nodedown

#### 一个简单的markdown转换器

> A simple markdown converter

version: 0.1.0

## Install

```
npm install nodedown
```

## Usage

```javascript
var nodedown = require("nodedown")

// 第一个参数是要转换的md字符串，第二个参数是转换之后的html字符串
// @param input markdown string
// @param callback(result)
nodedown.digest(mdstring, function(result){
    console.log(result)
})
```

## Bug

这个项目目前还在开发中，有疑问和建议请向作者本人联系，[Email](mailto://wallax@126.com)

> This project is in build, you can contact to author with [Email](mailto://wallax@126.com)