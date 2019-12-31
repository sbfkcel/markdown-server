const http = require("http"),
    url = require('url'),
    qs = require('querystring'),
    mathjax = require("mathjax-node"),
    mermaid = require("./mermaid"),
    Svgo = require('svgo'),
    svgoConfig = require('./svgoConfig');

mathjax.start();

const app = http.createServer((req,res)=>{
    let queryObj = qs.parse(url.parse(req.url).query),
        tex = queryObj.tex,
        mer = queryObj.mer,
        errFn = (msg)=>{
            res.writeHead(404,{'Content-type':'text/html;charset=utf-8'});
            res.write(msg);
            res.end();
        },
        successFn = (result)=>{
            res.writeHead(200,{'Content-type':'image/svg+xml;charset=utf-8'});
            res.write(result);
            res.end();
        };

    if(mer){
        mermaid(mer).then(v => {
            successFn(v);
        }).catch(err => {
            errFn('mermaid parameter error');               // 流程图输入错误
        });
    }else if(tex){
        mathjax.typeset({
            math:tex,
            format:'TeX',
            svg:true
        },data => {
            if(data.errors){
                errFn('LaTeX formula is wrong!');           // LaTeX公式错误
            }else{
                new Svgo(svgoConfig).optimize(data.svg).then(result => {
                    successFn(result.data);
                }).catch(err => {
                    errFn('LaTeX SVG compression error!');  // SVG压缩错误
                });
            };
        })
    }else{
        // 请通过`tex`参数传入LaTeX公式，或使用`mer`参数传入`mermaid`表达式。
        errFn('Please pass LaTeX formula via `tex` parameter or` mermaid` expression using `mer` parameter.');
    };
});
app.listen(8001);