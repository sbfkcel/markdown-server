# Markdown-server

Markdown-server 提供了Markdown的数学公式 `Lexte`，以及流程图`Mermaid`服务端渲染支持。

## 如何使用

- clone 本项目
    - `git clone https://github.com/sbfkcel/markdown-server`
- 安装依赖
    - `npm install` 或 `yarn`
- 启动服务
    - `node index.js`

## 查看服务

可以通过以下示例用来查看服务是否正常。

- [LaTeX 数字公式](http://localhost:8001/?tex=x%20%3D%20%7B-b%20%5Cpm%20%5Csqrt%7Bb%5E2-4ac%7D%20%5Cover%202a%7D.)
- [Mermaid 流程图](http://localhost:8001/?mer=graph%20TD%0AA%5BChristmas%5D%20-->%7CGet%20money%7C%20B(Go%20shopping))

## 修改服务端口

编辑 `index.js` 最后一行的端口号即可。