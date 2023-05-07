import express from 'express';
import { ClientController } from '../controllers';
import { auth } from '../../../../shared/presentation/middlewares';
import { createUserValidator } from '../middlewares';


export default () => {
  const router = express.Router();

  const usersController = new ClientController;

  router.post('/createClient', auth, createUserValidator, usersController.createClient)

  return router;
}