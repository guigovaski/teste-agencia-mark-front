import { EventType } from "./EventType";
import { Email } from "./Email";
import { WhatsApp } from "./WhatsApp";

export type EventMessages = {
  emails: Email[];
  whatsApps: WhatsApp[];
} & EventType;