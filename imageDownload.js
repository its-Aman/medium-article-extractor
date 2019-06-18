const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");

download = (uri) => {
    split = uri.split('/');
    filename = split[split.length - 1];

    request.head(uri, (err, res, body) => {
        request(uri)
            .pipe(fs.createWriteStream(`img/${filename}`))
            .on("close", () => {
                console.log(`${filename} downloaded!!!`);
            });
    });
}

(async () => {
    const url = process.argv[2];

    if (url.constructor.name === "String") {
        download(url);
    }

    if (url.constructor.name === "Array") {
        url.forEach(img => {
            download(img);
        });
    }


})();