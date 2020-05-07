import { EventData } from "./EventData";

export interface ParserResponse {
  success: boolean;
  data?: EventData;
}
