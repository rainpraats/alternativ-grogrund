import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from './UserRole';
import { Address } from './Address';

export interface IUser extends Document {
  _id: any;
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  email: string;
  phone: string;
  address: Address;
  personnummer: string;
  memberSince: Date;
  checkPassword(
    passwordToCheck: string,
    userPassword: string,
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 3, // should be longer but is short for testing purposes
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number'],
  },
  address: {
    addressLine1: {
      type: String,
      required: [true, 'Address line 1 is required'],
    },
    addressLine2: {
      type: String,
    },
    locality: {
      type: String,
      required: [true, 'Locality is required'],
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
    },
  },
  personnummer: {
    type: String,
    required: [true, 'Personnummer is required'],
    match: [
      /^\d{6}-?\d{4}$|^\d{8}-?\d{4}$/,
      'Personnummer must be 10 or 12 digits with an optional dash before the last 4 digits',
    ],
    unique: true,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  passwordToCheck: string,
  userPassword: string,
) {
  return await bcrypt.compare(passwordToCheck, userPassword);
};

export default mongoose.model<IUser>('User', userSchema);
