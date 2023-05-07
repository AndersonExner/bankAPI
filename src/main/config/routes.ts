import express, {Express} from 'express';
import userRoutes from '../../app/features/users/presentation/routes/user.routes';
import accRoutes from '../../app/features/accounts/presentation/routes/account.routes';
import loginRoutes from '../../app/features/authentication/routes/auth.routes'
import managerRoutes from '../../app/features/managers/presentation/routes/manager.routes';

export default (app: Express) => {
  app.get('/', (req, res) => res.status(200).json('API running...')  )
  app.use(managerRoutes())
  app.use(userRoutes());
  app.use(loginRoutes());
  app.use(accRoutes());
};