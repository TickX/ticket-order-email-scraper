"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkedDataParser_1 = __importDefault(require("./parsers/linkedDataParser"));
const regExpParser_1 = __importDefault(require("./parsers/regExpParser"));
const fs = require("fs");
const cheerio = require("cheerio");
const simpleParser = require("mailparser").simpleParser;
let input = fs.createReadStream(__dirname + "/emails/LinkedData.eml");
simpleParser(input)
    .then((mail) => {
    var _a, _b;
    const $ = cheerio.load(mail.html);
    let parsedData;
    const linkedData = $('script[type="application/ld+json"]');
    if (linkedData.length) {
        parsedData = linkedDataParser_1.default(linkedData);
    }
    if ((_a = parsedData) === null || _a === void 0 ? void 0 : _a.success) {
        // Do Something
        return;
    }
    parsedData = regExpParser_1.default(mail.html);
    if ((_b = parsedData) === null || _b === void 0 ? void 0 : _b.success) {
        // Do Something
        return;
    }
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map