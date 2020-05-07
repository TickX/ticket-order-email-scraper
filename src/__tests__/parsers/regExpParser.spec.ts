import { ParsedMail } from "mailparser";
import fs from "fs";
import regExpParser from "../../parsers/regExpParser";

describe("regExpParser test", () => {
  it("should return a parsed object (RegExp)", () => {
    const simpleParser = require("mailparser").simpleParser;
    let input = fs.createReadStream(__dirname + "/../../../emails/RegExp.eml");

    return simpleParser(input).then((mail: ParsedMail) =>
      expect(regExpParser(mail.html as string)).toEqual({
        success: true,
        data: {
          event: {
            name: "Live At Leeds 2019",
            reservationNumber: "43214321",
            venue: "Various Leeds Venues, Leeds",
          },
          customer: {
            name: "MR GEORGE MICHAEL",
            date: "2019-05-03T23:00:00.000Z",
          },
        },
      })
    );
  });

  it("should return a parsed object (RegExp-1)", () => {
    const simpleParser = require("mailparser").simpleParser;
    let input = fs.createReadStream(
      __dirname + "/../../../emails/RegExp-1.eml"
    );

    return simpleParser(input).then((mail: ParsedMail) =>
      expect(regExpParser(mail.html as string)).toEqual({
        success: true,
        data: {
          event: {
            name: "Hamilton Leithauser",
            reservationNumber: "12341234",
            venue: "Manchester Academy 2, Manchester",
          },
          customer: {
            name: "MR GEORGE MICHAEL",
            date: "2020-06-04T19:00:00.000Z",
          },
        },
      })
    );
  });
});
