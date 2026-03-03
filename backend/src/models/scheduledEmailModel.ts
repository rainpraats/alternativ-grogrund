import mongoose from 'mongoose';

export interface IEmail extends Document {
  subject: string;
  message: string;
  scheduledAt: Date;
}

const emailSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  sent: { type: Boolean, default: false },
});

export default mongoose.model<IEmail>('ScheduledEmail', emailSchema);
