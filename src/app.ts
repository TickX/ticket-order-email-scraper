import { ParsedMail } from "mailparser";

import linkedDataParser from "./parsers/linkedDataParser";
import regExpParser from "./parsers/regExpParser";

const fs = require("fs");
const cheerio = require("cheerio");

const simpleParser = require("mailparser").simpleParser;
let input = fs.createReadStream(__dirname + "/emails/LinkedData.eml");

simpleParser(input)
  .then((mail: ParsedMail) => {
    const $ = cheerio.load(mail.html);
    let parsedData;
    const linkedData = $('script[type="application/ld+json"]');
    if (linkedData.length) {
      parsedData = linkedDataParser(linkedData);
    }

    if (parsedData?.success) {
      // Do Something
      return;
    }

    parsedData = regExpParser(mail.html as string);
    if (parsedData?.success) {
      // Do Something
      return;
    }
  })
  .catch((err: Error) => {
    console.log(err);
  });
