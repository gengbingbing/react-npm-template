---
title:   React 发布npm插件库
---

@(作者)[腾宇]
> 技术栈：  react + less + webpack + babel
> 模板地址：https://github.com/gengbingbing/react-npm-template.git
## 一、搭建框架或下载模板

### 1、初始化项目
```javascript
mkdir react-npm-template
cd react-npm-template
npm init
```
**根据提示输入配置信息后，将看到 package.json 文件已创建。**

### 2、安装一些npm依赖
```javascript
npm install react react-dom prop-types -S
npm install webpack webpack-cli webpack-dev-server -D
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader -D
npm install html-webpack-plugin -D
npm install style-loader css-loader less less-loader -D
```

### 3、配置package.json
```javascript
{
  "name": "react-npm-template",
  "version": "0.0.1",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "build": "webpack --env.NODE_ENV=production",
    "start": "webpack-dev-server --hot --open",
    "dev": "npm run start"
  },
  "files": [
    "dist"
  ],
  "author": "tengyu",
  "license": "ISC",
  "dependencies": {
    "prop-types": "^15.7.2",
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "eslint": "^6.3.0",
    "eslint-friendly-formatter": "^4.0.1",
    "eslint-loader": "^3.0.0",
    "eslint-plugin-react": "^7.14.3",
    "file-loader": "^4.2.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "style-loader": "^1.0.0",
    "url-loader": "^2.1.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.8",
    "webpack-dev-server": "^3.8.0"
  }
}
```
- **main： 为打包后的出口文件；**
- **scripts： 为 webpack 命令配置；**
- **files： 为推送到 npm 仓库所包括的文件。**

### 4、配置 babel
**根目录下新建 .babelrc 文件**
```javascript
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```
### 5、创建 webpack 相关文件
webpack.config.js
```javascript
module.exports = (env) => {
    if (env && env.NODE_ENV === 'production') {
        return require('./webpack.prod.config.js');
    } else {
        return require('./webpack.dev.config.js');
    }
};
```
webpack.dev.config.js
```javascript
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader', options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|git|png|svg|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name]-[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|svg|eot|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8888
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};
```
webpack.prod.config.js
```javascript
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader', options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    }
};
```
### 6、创建组件
在src中创建自己的业务组件或UI组件-具体见实例
https://github.com/gengbingbing/react-npm-template.git


## 二、启动测试
```javascript
npm run start  || npm run dev

npm build
```
## 三、上传组件至npm库
### 1、首先需要切换 npm 源
```javascript
npm config set registry http://registry.npmjs.org
```
### 2、添加 npm 账号，根据提示完成信息输入
```javascript
npm adduser
```
### 3、上传组件
```javascript
npm publish
```

### 4、下载测试
```javascript
npm install react-npm-template

// 在项目中
import { Button } from 'react-npm-template';
```
