const http = require("http"),
    url = require('url'),
    qs = require('querystring'),
    mathjax = require("mathjax-node"),
    Svgo = require('svgo'),
    svgoConfig = require('./svgoConfig'),
    yuml2svg = require('yuml2svg');

mathjax.start();

const app = http.createServer((req,res)=>{
    let queryObj = qs.parse(url.parse(req.url).query),
        tex = queryObj.tex,
        yuml = queryObj.yuml,
        theme = queryObj.theme,
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
    
    if(yuml){
        yuml2svg(yuml,{isDark:theme === 'dark'}).then(v => {
            new Svgo().optimize(v).then(result => {
                successFn(result.data);
            }).catch(err => {
                errFn('Yuml SVG compression error!');       // SVG压缩错误
            });
        }).catch(e => {
            errFn('Yuml formula is wrong!');
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
                    if(theme === 'dark'){
                        result.data = result.data.replace(`<svg`,`<svg fill="#ffffff" `);
                    };
                    successFn(result.data);
                }).catch(err => {
                    errFn('LaTeX SVG compression error!');  // SVG压缩错误
                });
            };
        })
    }else{
        // 请通过`tex`参数传入LaTeX公式，或使用`yuml`参数传入`yuml`表达式。
        errFn('Please pass LaTeX formula via `tex` parameter or `Yuml` expression using `yuml` parameter.');
    };
});
app.listen(8001);