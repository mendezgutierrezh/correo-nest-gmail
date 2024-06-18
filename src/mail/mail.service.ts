import { Injectable, Logger } from "@nestjs/common";
import { createGoogleCalendarEvent } from "./calendar-event";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";


@Injectable()
export class MailService {
  private readonly logger = new Logger("MailService");

  constructor(private mailerService: MailerService) {
  }

  async sendCalendarInvite() {
    try {
      const eventLink = await createGoogleCalendarEvent();
      this.logger.log("Calendar invite sent with link: " + eventLink);
    } catch (error) {
      this.logger.error("Error sending calendar invite", error);
    }
  }

  async sendEventInvite(email: string, context: any) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: "\"Equipo de Parques\" <no-reply@parquecordillera.cl>",
        subject: "Invitación a Evento",
        template: "event-invite",
        context: context,
        attachments: [
          {
            filename: "logo.png",
            path: join(__dirname, "..", "..", "assets", "logo-correo.png"),
            cid: "logo"
          }
        ]
      });

      this.logger.log("Event invite email sent");
    } catch (error) {
      this.logger.error("Error sending event invite email", error);
    }
  }

  async sendThankYouEmail(responsibleName: string, email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: "\"Parque Cordillera\" <no-reply@parquecordillera.cl>",
        subject: "Agradecimiento por su Visita",
        template: "encuesta",
        context: {
          responsibleName: responsibleName
        },
        attachments: [
          {
            filename: "logo.png",
            path: join(__dirname, "..", "..", "assets", "logo-correo.png"),
            cid: "logo"
          }
        ]
      });

      this.logger.log("Thank you email sent");
    } catch (error) {
      this.logger.error("Error sending thank you email", error);
    }
  }

  async sendCombinedInvite(emails: string[], context: any) {
    try {
      // Enviar la invitación al calendario
      const eventLink = await this.sendCalendarInvite();

      // Añadir el enlace del evento al contexto
      context.eventLink = eventLink;

      // Enviar el correo con la información del evento a todos los destinatarios
      for (const email of emails) {
        await this.sendEventInvite(email, context);
      }

      this.logger.log("Combined invite sent to all recipients");
    } catch (error) {
      this.logger.error("Error sending combined invite", error);
    }
  }
}
