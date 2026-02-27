import nodemailer from 'nodemailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const createTransporter = () => {
  const port = 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.YOUR_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async (options: SendEmailOptions) => {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: process.env.YOUR_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
};
