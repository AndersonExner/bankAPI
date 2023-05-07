import express from 'express';
import { AccountController } from '../controllers/account.controller';
import { auth } from '../../../../shared/presentation/middlewares';
import { createAccountValidator } from '../middlewares';


export default () => {
  const router = express.Router();

  const accController = new AccountController()

  router.post('/createAccount', auth, createAccountValidator, accController.createAccount)

  return router;
}