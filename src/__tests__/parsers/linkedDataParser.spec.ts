import linkedDataParser from "../../parsers/linkedDataParser";

describe("linkedDataParser test", () => {
  it("should return a parsed object", () => {
    const eventReservation = require("../schema/samples/EventReservation.json");
    const result = linkedDataParser([eventReservation]);

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
    const result = linkedDataParser([eventReservation, emailMessage]);

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
    const result = linkedDataParser([emailMessage]);

    expect(result).toEqual({
      success: false,
    });
  });
});
