import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MailService } from "./mail/mail.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailService: MailService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("send-email")
  async sendEmail() {
    await this.mailService.testEmail();
    return "Email sent";
  }

}
