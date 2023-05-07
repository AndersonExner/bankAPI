import express from 'express';
import { loginValidation } from '../presentation/middlewares';
import { AutenthicationController } from '../presentation/controllers';

export default () => {
    const router = express.Router();

    router.post('/login', loginValidation, new AutenthicationController().login);

    return router;
};