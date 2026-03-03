import UserRepository from '../repositories/userRepository.js';
import EmailRepository from '../repositories/emailRepository.js';
import { catchErrorAsync } from '../utilities/catchErrorAsync.js';
import { sendEmail } from '../utilities/emailSender.js';

export const receiveEmail = catchErrorAsync(async (req, res, next) => {
  const { name, emailAdress, message } = req.body;
  console.log(req.body);
  sendEmail({
    to: process.env.YOUR_EMAIL!,
    subject: `Skickat från kontaktformuläret på alternativgrogrund.se`,
    text: `Kontaktmail för återkoppling: ${emailAdress}\n\n ${name} skrev: ${message}`,
  });
  res.status(201).json({ success: true, statusCode: 201 });
});

export const sendEmailToAllMembers = catchErrorAsync(async (req, res, next) => {
  const { subject, message, scheduledAt } = req.body;
  console.log(scheduledAt);
  await new EmailRepository().create(subject, message, scheduledAt);
  return res.status(201).json({ success: true, statusCode: 201 });
});
