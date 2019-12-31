const puppeteer = require('puppeteer'),
    path = require('path'),
    puppeteerConfig = {};
    
module.exports = str => {
    return new Promise(async (resolve,reject) => {
        try {
            const browser = await puppeteer.launch(puppeteerConfig),
                page = await browser.newPage();
            await page.goto(`file://${path.join(__dirname,'mermaid','page.html')}`);
            await page.$eval('#container', (container, definition) => {
                container.innerHTML = definition;
                window.mermaid.initialize({
                    theme:'forest'
                });
                window.mermaid.init(undefined, container);
            },str);
            resolve(await page.$eval('#container', container => container.innerHTML));
        } catch (error) {
            reject(error);
        };
    });
};