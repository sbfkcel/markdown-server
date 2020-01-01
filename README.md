# Markdown-server

Markdown-server 提供了Markdown的数学公式 `Lexte`，以及流程图`yUML`服务端渲染支持。

## 如何使用

- clone 本项目
    - `git clone https://github.com/sbfkcel/markdown-server`
- 安装依赖
    - `npm install` 或 `yarn`
- 启动服务
    - `node index.js`

## 查看服务

可以通过以下示例用来查看服务是否正常。

- [LaTeX 数学公式](http://localhost:8001/?tex=x%20%3D%20%7B-b%20%5Cpm%20%5Csqrt%7Bb%5E2-4ac%7D%20%5Cover%202a%7D.)
- [yUML 流程图](http://localhost:8001/?yuml=%2F%2F%20%7Btype%3Aactivity%7D%0A%2F%2F%20%7Bgenerate%3Atrue%7D%0A%0A(start)-%3E%3Ca%3E%5Bkettle%20empty%5D-%3E(Fill%20Kettle)-%3E%7Cb%7C%0A%3Ca%3E%5Bkettle%20full%5D-%3E%7Cb%7C-%3E(Boil%20Kettle)-%3E%7Cc%7C%0A%7Cb%7C-%3E(Add%20Tea%20Bag)-%3E(Add%20Milk)-%3E%7Cc%7C-%3E(Pour%20Water)%0A(Pour%20Water)-%3E(end))

## 修改服务端口

编辑 `index.js` 最后一行的端口号即可。