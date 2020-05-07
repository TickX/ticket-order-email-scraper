"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const moment_1 = __importDefault(require("moment"));
const BOOKING_REFERENCE = /BOOKING REFERENCE ([\d]+)\n/;
const ORDER_CONFIRMED = /Order confirmed: (.+)\n/;
const CUSTOMER_NAME = /Hi ([\w\s]+)\n/;
const VENUE_NAME = "Booking confirmation for {eventName} at (.+)";
/**
 * Extract the booking reference from a string buffer
 *
 * @param buffer
 * @returns {string} The booking reference
 */
const getBookingReference = (buffer) => {
    const bookingReference = buffer.match(BOOKING_REFERENCE);
    if (bookingReference) {
        return bookingReference[1];
    }
    return "";
};
/**
 * Extract the event name from a string buffer
 *
 * @param buffer
 * @returns {string} The event name
 */
const getEventName = (buffer) => {
    const eventName = buffer.match(ORDER_CONFIRMED);
    if (eventName) {
        return eventName[1];
    }
    return "";
};
/**
 * Extract the customer name from a string buffer
 *
 * @param buffer
 * @returns {string} The customer name
 */
const getCustomerName = (buffer) => {
    const customerName = buffer.match(CUSTOMER_NAME);
    if (customerName) {
        return customerName[1];
    }
    return "";
};
/**
 * Extract the venue name from a string buffer
 *
 * @param buffer
 * @param eventName
 * @returns {string} The venue name
 */
const getVenueName = (buffer, eventName) => {
    const $ = cheerio_1.default.load(buffer);
    const title = $(".preheader").text() || $("title").text();
    if (title) {
        const venueName = title.match(VENUE_NAME.replace("{eventName}", eventName));
        if (venueName) {
            return venueName[1];
        }
    }
    return "";
};
/**
 * Extract the event's date and time from a string buffer
 *
 * @param buffer
 * @returns {string} The date and time for the event
 */
const getEventDateTime = (buffer) => {
    const $ = cheerio_1.default.load(buffer);
    const text = $.root().text().split("\n").filter(Boolean);
    const descriptionBlock = text.find((s) => [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ].some((d) => s.includes(d)));
    if (descriptionBlock) {
        var date = moment_1.default(descriptionBlock.trim(), "dddd, D MMM YYYY at HH.mm");
        return date.toDate().toISOString();
    }
    return "";
};
exports.default = (buffer) => {
    const bookingReference = getBookingReference(buffer);
    const customerName = getCustomerName(buffer);
    const eventName = getEventName(buffer);
    const venueName = getVenueName(buffer, eventName);
    const eventDateTime = getEventDateTime(buffer);
    // Check if there is a full data set
    if ([
        bookingReference,
        customerName,
        eventName,
        venueName,
        eventDateTime,
    ].filter(Boolean).length == 5) {
        return {
            success: true,
            data: {
                event: {
                    name: eventName,
                    reservationNumber: bookingReference,
                    venue: venueName,
                },
                customer: {
                    name: customerName,
                    date: eventDateTime,
                },
            },
        };
    }
    return {
        success: false,
    };
};
//# sourceMappingURL=regExpParser.js.map