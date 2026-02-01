import { catchErrorAsync } from '../utilities/catchErrorAsync.js';
import UserRepository from '../repositories/userRepository.js';

export const addUser = catchErrorAsync(async (req, res, next) => {
  const user = await new UserRepository().add(req.body);
  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { user: user } });
});

export const listUsers = catchErrorAsync(async (req, res, next) => {
  const users = await new UserRepository().list();

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { users: users } });
});

export const deleteUser = catchErrorAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await new UserRepository().findByEmail(email);

  if (!user) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No such user exists',
    });
  }

  await new UserRepository().deleteById(user._id.toString());

  res.status(204).end();
});

export const editUser = catchErrorAsync(async (req, res, next) => {
  const { email, updatedUser } = req.body;

  const originalUser = await new UserRepository().findByEmail(email);

  if (!originalUser) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No such user exists',
    });
  }

  const user = await new UserRepository().edit(
    originalUser._id.toString(),
    updatedUser,
  );

  res
    .status(200)
    .json({ success: true, statusCode: 201, data: { user: user } });
});
