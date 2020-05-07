"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const eventReservationParser = (linkedData) => {
    const customerName = lodash_1.get(linkedData, "underName.name");
    const eventName = lodash_1.get(linkedData, "reservationFor.name");
    const reservationNumber = lodash_1.get(linkedData, "reservationNumber");
    const date = lodash_1.get(linkedData, "reservationFor.startDate");
    const venue = lodash_1.get(linkedData, "reservationFor.location.name");
    return {
        event: {
            name: eventName,
            reservationNumber,
            venue,
        },
        customer: {
            name: customerName,
            date,
        },
    };
};
exports.default = (linkedData) => {
    const data = linkedData.find((e) => e["@type"] === "EventReservation");
    if (data) {
        return {
            success: true,
            data: eventReservationParser(data),
        };
    }
    return {
        success: false,
    };
};
//# sourceMappingURL=linkedDataParser.js.map