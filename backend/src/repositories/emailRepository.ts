import ScheduledEmail from '../models/scheduledEmailModel.js';

export default class EmailRepository {
  async create(subject: string, message: string, scheduledAt: string) {
    return await ScheduledEmail.create({ subject, message, scheduledAt });
  }

  async findPending() {
    return await ScheduledEmail.find({
      scheduledAt: { $lte: new Date() },
      sent: false,
    });
  }

  async markSent(id: string) {
    return await ScheduledEmail.findByIdAndUpdate(id, { sent: true });
  }
}
