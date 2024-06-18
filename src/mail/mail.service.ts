import { Injectable, Logger } from "@nestjs/common";
import { createGoogleCalendarEvent } from "./calendar-event";

@Injectable()
export class MailService {
  private readonly logger = new Logger("MailService");

  async sendCalendarInvite() {
    try {
      const eventLink = await createGoogleCalendarEvent();
      this.logger.log("Calendar invite sent with link: " + eventLink);
    } catch (error) {
      this.logger.error("Error sending calendar invite", error);
    }
  }
}
