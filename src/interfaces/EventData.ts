export interface EventData {
  event: {
    name: string;
    reservationNumber: string;
    venue: string;
  };
  customer: {
    name: string;
    date: string;
  };
}
