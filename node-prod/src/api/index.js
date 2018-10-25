import express from 'express';
import { invoiceRouter } from './resources/invoice';
import { clientRouter } from './resources/client';
import { userRouter } from './resources/user';
import {mailerRouter} from './resources/mailer';
import { authRouter } from './resources/auth';

export const restRouter = express.Router();
restRouter.use('/invoices', invoiceRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/users', userRouter);
restRouter.use('/mailer', mailerRouter);
restRouter.use('/auth',  authRouter);