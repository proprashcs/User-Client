import express from 'express';
import passport from 'passport';
import mailerController from './mailer.controller';
export const mailerRouter = express.Router();

mailerRouter.route('/')
.post(passport.authenticate('jwt', {session:false}), mailerController.sendMailer);
 


