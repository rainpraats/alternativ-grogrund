import { type User } from '../models/User';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export default class UserRepository {
  async add(user: User) {
    return await userModel.create(user);
  }

  async findById(id: string) {
    return await userModel.findById(id);
  }

  async findByEmail(email: string, login: boolean = false) {
    return login === true
      ? await userModel.findOne({ email: email }).select('+password')
      : await userModel.findOne({ email: email });
  }

  async list() {
    return await userModel.find();
  }

  async deleteById(id: string) {
    return await userModel.findByIdAndDelete(id);
  }

  async edit(id: string, updatedUser: User) {
    if (updatedUser.password) {
      updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
    }

    return await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
  }
}
