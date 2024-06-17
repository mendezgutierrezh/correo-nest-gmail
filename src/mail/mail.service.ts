/*
import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { createGoogleCalendarEvent } from "./calendar-event";

@Injectable()
export class MailService {
  private readonly logger = new Logger("MailService");

  constructor(private mailerService: MailerService) {
  }

  async sendCalendarInvite() {
    try {
      const eventLink = await createGoogleCalendarEvent();
      const toEmails = [
        "hector.mendez.gutierrez@outlook.com",
        "hectorelectron9@gmail.com"
      ];

      await this.mailerService.sendMail({
        to: toEmails,
        from: "\"Héctor\" <hectorelectron9@gmail.com>",
        subject: "Invitación a Evento de Calendario",
        html: `<p>Hola, John Doe</p>
               <p>Te invitamos a nuestro evento "Reunión de Proyecto".</p>
               <p>Descripción: Revisión del estado del proyecto</p>
               <p>Lugar: Oficina Principal</p>
               <p>Fecha y Hora: 20 de Junio de 2024 a las 10:00 AM</p>
               <p><a href="${eventLink}">Ver en Google Calendar</a></p>
               <p>Responder a hectorelectron9@gmail.com</p>`
      });

      this.logger.log("Calendar invite sent");
    } catch (error) {
      this.logger.error("Error sending calendar invite", error);
    }
  }
}
*/
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
