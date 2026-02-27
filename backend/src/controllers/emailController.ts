import UserRepository from '../repositories/userRepository.js';
import { catchErrorAsync } from '../utilities/catchErrorAsync.js';
import { sendEmail } from '../utilities/emailSender.js';

export interface emailData {
  title: string;
  emailAdress: string;
  message: string;
}

export const receiveEmail = catchErrorAsync(async (req, res, next) => {
  const { title, emailAdress, message }: emailData = req.body;
  console.log(req.body);
  sendEmail({
    to: process.env.YOUR_EMAIL!,
    subject: `Skickat från kontaktformuläret på alternativgrogrund.se`,
    text: `Kontaktmail för återkoppling: ${emailAdress}\n\n De skrev: ${message}`,
  });
  res.status(201).json({ success: true, statusCode: 201 });
});

export const sendEmailToAllMembers = catchErrorAsync(async (req, res, next) => {
  const allMembers = await new UserRepository().list();

  res.status(201).json({ success: true, statusCode: 201 });
});

export const sendEmailToAll = catchErrorAsync(async (req, res, next) => {
  const { subject, message } = req.body;

  const members = await new UserRepository().list();

  const emailPromises = members.map((member) =>
    sendEmail({
      to: member.email,
      subject: subject,
      text: message,
    }),
  );

  await Promise.all(emailPromises);

  res.status(200).json({
    success: true,
    statusCode: 200,
  });
});
