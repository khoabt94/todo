import { MailOptionsTemplate } from '@/interfaces/email';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({ // config mail server
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: '12cb0190b41300',
    pass: '2454ff0ff91872'
  }
});

export default async function sendEmail(mailOptions: MailOptionsTemplate) {
  return await transporter.sendMail(mailOptions);
}

