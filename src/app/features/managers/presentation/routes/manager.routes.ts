import express from 'express';
import { ManagerController } from '../controllers';
import { createManagerValidator } from '../middlewares';
import { auth } from '../../../../shared/presentation/middlewares';


export default () => {
  const router = express.Router();

  const managerController = new ManagerController;

  router.post('/createManager', createManagerValidator, managerController.createManager)

  router.get('/listClients', auth, managerController.getClients)

  router.put('/changeClientLimit', auth, managerController.changeClientLimit)

  router.delete('/deleteClient', auth, managerController.deleteAcc)

  return router;
}