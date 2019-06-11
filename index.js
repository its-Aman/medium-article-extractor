const puppeteer = require('puppeteer');

const loading = (filename) => {
    const h = ['|', '/', '-', '\\'];
    let i = 0;

    return setInterval(() => {
        i = (i > 3) ? 0 : i;
        console.clear();
        console.log(h[i], `Downloading: ${filename}\n`);
        i++;
    }, 300);
};


(
    async () => {

        try {
            if (process.argv[2] && process.argv[2].length) {
                const url = process.argv[2];
                let path = url.split('/');
                path = path[path.length - 1];
                path = path.slice(0, path.length < 45 ? path.length : 45) + '.pdf';

                const loadStart = loading(path);

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url, { waitUntil: 'networkidle2' });

                await page.pdf({ path: path, format: 'A4' });

                await browser.close();
                clearInterval(loadStart);
                console.clear();
                console.log(`Downloaded: ${path} !`);
            }
        } catch (err) {
            console.log(`Some error occoured \n`, err);
        }
    }
)();