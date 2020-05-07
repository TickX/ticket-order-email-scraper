"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkedDataParser_1 = __importDefault(require("../../parsers/linkedDataParser"));
describe("linkedDataParser test", () => {
    it("should return a parsed object", () => {
        const eventReservation = require("../schema/samples/EventReservation.json");
        const result = linkedDataParser_1.default([eventReservation]);
        expect(result).toEqual({
            success: true,
            data: {
                event: {
                    name: "WHITE LIES",
                    reservationNumber: "11112222",
                    venue: "Albert Hall",
                },
                customer: {
                    name: "MR GEORGE MICHAEL",
                    date: "2019-02-08T18:00:00+00:00",
                },
            },
        });
    });
    it("should filter multiple LD+JSON inputs and return a parsed object", () => {
        const eventReservation = require("../schema/samples/EventReservation.json");
        const emailMessage = require("../schema/samples/EmailMessage.json");
        const result = linkedDataParser_1.default([eventReservation, emailMessage]);
        expect(result).toEqual({
            success: true,
            data: {
                event: {
                    name: "WHITE LIES",
                    reservationNumber: "11112222",
                    venue: "Albert Hall",
                },
                customer: {
                    name: "MR GEORGE MICHAEL",
                    date: "2019-02-08T18:00:00+00:00",
                },
            },
        });
    });
    it("should return a failed parsing response when no valid data is provided", () => {
        const emailMessage = require("../schema/samples/EmailMessage.json");
        const result = linkedDataParser_1.default([emailMessage]);
        expect(result).toEqual({
            success: false,
        });
    });
});
//# sourceMappingURL=linkedDataParser.spec.js.map