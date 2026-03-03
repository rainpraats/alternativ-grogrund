import EmailRepository from '../repositories/emailRepository.js';
import UserRepository from '../repositories/userRepository.js';
import { sendEmail } from './emailSender.js';

const processPendingEmails = async () => {
  const emailRepository = new EmailRepository();
  const pending = await emailRepository.findPending();

  if (pending.length === 0) return;

  const members = await new UserRepository().list();

  for (const email of pending) {
    await Promise.all(
      members.map((member) =>
        sendEmail({
          to: member.email,
          subject: email.subject,
          text: email.message,
        }),
      ),
    );
    await emailRepository.markSent(email._id.toString());
  }
};

export const startEmailScheduler = () => {
  processPendingEmails();
  setInterval(processPendingEmails, 60 * 1000);
};
