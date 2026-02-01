import mongoose from 'mongoose';
import UserRepository from './repositories/userRepository';
import { MONGO_URI } from './validateENV';
import { User } from './models/User';

const admin: User = {
  firstName: 'admin',
  lastName: 'admin',
  role: 'admin',
  password: 'bob',
  email: 'admin@alternativgrogrund.se',
  phone: '+46701234567',
  address: {
    addressLine1: 'Bobstreet 1',
    locality: 'Bobtown',
    postalCode: '12345',
  },
  personnummer: '123456-7890',
};

const createAdmin = async () => {
  await mongoose.connect(MONGO_URI);

  const repo = new UserRepository();
  const adminDocument = await repo.add(admin);

  console.log('Admin user created:', adminDocument);
  await mongoose.disconnect();
};

createAdmin();
