# gallery-by-react
one photo gallery based on react.

在线观看

[https://sdshaoda.github.io/gallery-by-react/](https://sdshaoda.github.io/gallery-by-react/)

或者

安装依赖

`npm install`

yeoman安装配置项的时候因你懂的的原因，phantomJS下载时会异常缓慢甚至出错。可将npm替换为cnpm或着采用下列方法

- 通过config命令

npm config set registry https://registry.npm.taobao.org
npm info underscore

（如果上面配置正确这个命令会有字符串response）

- 命令行指定

npm --registry https://registry.npm.taobao.org info underscore

- 编辑 ~/.npmrc 加入下面内容

registry = https://registry.npm.taobao.org


需要自己安装Sass loader for webpack

npm install sass-loader node-sass --save-dev

启动项目

`npm start`