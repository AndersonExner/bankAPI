import { appDataSource } from "./app/shared/infra/db/data-source";
import app from "./main/config/app";
import 'dotenv/config';

const port = process.env.PORT;

appDataSource.initialize().then(()=> {
  app.listen(port || 8080, () => console.log('server is running'));
})
