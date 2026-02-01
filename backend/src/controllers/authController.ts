import { createToken, verifyToken } from '../utilities/authUtilities.js';
import { catchErrorAsync } from '../utilities/catchErrorAsync.js';
import AppError from '../models/appError.js';
import UserRepository from '../repositories/userRepository.js';
import { UserRole } from '../models/UserRole.js';
import { Response, NextFunction } from 'express';
import { extractJWTFromHeader } from '../utilities/extractJWTfromHeader.js';
import { Address } from '../models/Address.js';

export const loginUser = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password required', 400));
  }

  const user = await new UserRepository().findByEmail(email, true);

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = createToken(user._id.toString());

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { token: token } });
});

export const protect = catchErrorAsync(async (req: any, res, next) => {
  const token = extractJWTFromHeader(req);

  const decoded = await verifyToken(token);

  const user = await new UserRepository().findById(decoded.id);

  req.user = user;

  next();
});

export const authorizeRole = (...roles: UserRole[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'Forbidden. Insufficient permissions to access the given resource',
          403,
        ),
      );
    }
    next();
  };
};

export const getCurrentUser = catchErrorAsync(async (req, res, next) => {
  const token = extractJWTFromHeader(req);

  const decoded = await verifyToken(token);

  const user = await new UserRepository().findById(decoded.id);

  if (!user) {
    throw new AppError('Unauthorized, you are not logged in', 401);
  }

  interface CurrentUser {
    firstName: string;
    lastName: string;
    role: UserRole;
    email: string;
    phone: string;
    address: Address;
    personnummer: string;
    memberSince: Date;
  }

  const currentUser: CurrentUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    phone: user.phone,
    address: {
      addressLine1: user.address.addressLine1,
      addressLine2: user.address.addressLine2,
      locality: user.address.locality,
      postalCode: user.address.postalCode,
    },
    personnummer: user.personnummer,
    memberSince: user.memberSince,
  };

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {
      user: {
        ...currentUser,
      },
    },
  });
});

export const deleteCurrentUser = catchErrorAsync(async (req, res, next) => {
  const token = extractJWTFromHeader(req);

  const decoded = await verifyToken(token);

  await new UserRepository().deleteById(decoded.id);

  res.status(204).end();
});
