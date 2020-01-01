const puppeteer = require('puppeteer'),
    path = require('path'),
    puppeteerConfig = {};

module.exports = (type,str) => {
    let pageFile = path.join(__dirname,type === 'flow'?'flow':'sequence','index.html'),
        flow = (container, str)=>{
            window.flowchart.parse(str).drawSVG('canvas');
        },
        sequence = (container, str)=>{
            window.Diagram.parse(str).drawSVG('canvas',{theme:'simple'});
        };
    return new Promise(async (resolve,reject) => {
        try {
            const browser = await puppeteer.launch(puppeteerConfig),
                page = await browser.newPage();
            await page.goto(`file://${pageFile}`);
            await page.$eval('body', type === 'flow' ? flow : sequence,str);
            let svg = await page.$eval('#canvas', container => container.innerHTML);
            resolve(svg);
        } catch (error) {
            reject(error);
        };
    });
};