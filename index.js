const http = require("http"),
    url = require('url'),
    qs = require('querystring'),
    mathjax = require("mathjax-node"),
    yuml2svg = require('yuml2svg'),
    port=process.env.PORT||9001;

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
            successFn(v);
        }).catch(e => {
            errFn('Yuml formula is wrong!');
        });
    }else if(tex){
        mathjax.typeset({
            math:tex,
            format:'TeX',
            svg:true
        },data => {
            if(theme === 'dark'){
                data.svg = data.svg.replace(/fill="currentColor"/g,'fill="#ffffff"');
            };
            successFn(data.svg);
        })
    }else{
        // 请通过`tex`参数传入LaTeX公式，或使用`yuml`参数传入`yuml`表达式。
        errFn('Please pass LaTeX formula via `tex` parameter or `Yuml` expression using `yuml` parameter.');
    };
});
app.listen(port);
