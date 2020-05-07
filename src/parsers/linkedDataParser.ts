import { EmailMessage, EventReservation, WithContext } from "schema-dts";

import { get } from "lodash";
import { ParserResponse } from "../interfaces/ParserResponse";
import { EventData } from "../interfaces/EventData";

const eventReservationParser = (linkedData: EventReservation): EventData => {
  const customerName = get(linkedData, "underName.name");
  const eventName = get(linkedData, "reservationFor.name");
  const reservationNumber = get(linkedData, "reservationNumber");
  const date = get(linkedData, "reservationFor.startDate");
  const venue = get(linkedData, "reservationFor.location.name");
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

export default (
  linkedData: Array<EventReservation | EmailMessage>
): ParserResponse => {
  const data = linkedData.find((e) => e["@type"] === "EventReservation");
  if (data) {
    return {
      success: true,
      data: eventReservationParser(data as EventReservation),
    };
  }

  return {
    success: false,
  };
};
