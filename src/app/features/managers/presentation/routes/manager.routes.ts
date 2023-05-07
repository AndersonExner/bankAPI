import express from 'express';
import { ManagerController } from '../controllers';
import { createManagerValidator } from '../middlewares';
import { auth } from '../../../../shared/presentation/middlewares';


export default () => {
  const router = express.Router();

  const managerController = new ManagerController;

  router.post('/createManager', createManagerValidator, managerController.createManager)

  router.get('/listClients', auth, managerController.getClients)

  router.post('/changeClientLimit', auth, managerController.changeClientLimit)

  return router;
}