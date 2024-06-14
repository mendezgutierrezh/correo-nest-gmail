import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  private readonly logger = new Logger("MailService");

  constructor(private mailerService: MailerService) {
  }

  async testEmail() {
    const toEmails = [
      "hector.mendez.gutierrez@outlook.com",
      "hectorelectron9@gmail.com"
    ];
    const user = "Héctor";
    const template = "./test.hbs";
    await this.mailerService.sendMail({
      to: toEmails,
      from: "\"Remitente hectorelectron9@gmail.com\"",
      subject: "Prueba de correo",
      template: template,
      context: {
        user
      }
    });
    this.logger.log("Email sent");
  }
}
