import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MailService } from "./mail/mail.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 @Get("send-invite")
  async sendInvite() {
    await this.mailService.sendCalendarInvite();
    return "Calendar invite sent";
  }

  @Get('send-survey')
  async sendThankYouEmail() {
    await this.mailService.sendThankYouEmail('Héctor Méndez', 'hector.mendez.gutierrez@outlook.com');
    return 'Thank you email sent';
  }

  @Get('send-event-invite')
  async sendEventInvite() {
    const context = {
      name: 'Hector Mendez',
      parkName: 'Parque Natural Aguas de Ramón',
      trailName: 'Canto del Agua',
      date: '22/06/2024',
      startTime: '08:00',
      endTime: '14:00',
      visitorCount: 32,
      subject: 'Deportivo'
    };
    await this.mailService.sendEventInvite('hector.mendez.gutierrez@outlook.com', context);
    return 'Event invite email sent';
  }

  @Get('send-combined-invite')
  async sendCombinedInvite() {
    const emails = [
      'hector.mendez.gutierrez@outlook.com',
      'hectortecno2014@gmail.com',
      'hmendez@solnet.cl'
    ];
    const context = {
      name: 'Hector Mendez',
      parkName: 'Parque Natural Aguas de Ramón',
      trailName: 'Canto del Agua',
      date: '22/06/2024',
      startTime: '08:00',
      endTime: '14:00',
      visitorCount: 32,
      subject: 'Deportivo'
    };
    await this.mailService.sendCombinedInvite(emails, context);
    return 'Combined invite email sent';
  }

}
