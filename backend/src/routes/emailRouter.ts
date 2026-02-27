import express from 'express';
import { authorizeRole, protect } from '../controllers/authController.js';
import {
  receiveEmail,
  sendEmailToAllMembers,
} from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter
  .route('/')
  .post(protect, authorizeRole('admin'), sendEmailToAllMembers);

emailRouter.route('/contact-request').post(receiveEmail);

export default emailRouter;
