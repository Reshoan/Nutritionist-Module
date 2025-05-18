// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { sendMailDto } from './dto/mail.dto';

@Injectable()
export class MailService {

  constructor(private readonly configService: ConfigService) {}

  emailTransport() {
  const transporter = nodemailer.createTransport({
    host: this.configService.get<string>('EMAIL_HOST'),  // e.g. 'smtp.brevo.com'
    port: this.configService.get<number>('EMAIL_PORT'),  // e.g. 587
    secure: false, // true for port 465, false for 587
    auth: {
      user: this.configService.get<string>('EMAIL_USER'),
      pass: this.configService.get<string>('EMAIL_PASS'),
    },
  });
  return transporter;
}


  

  async sendMail(dto: sendMailDto)
  {
    const {recipient, subject, html} = dto;
    const transport = this.emailTransport();
    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: recipient,
      subject: subject,
      html: html,
    };
    try{
      await transport.sendMail(options);
      console.log('Email sent successfully');

    }catch (error) {
      console.log('Error sending email:', error);
    }

  }
}
