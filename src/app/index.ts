import express from 'express';
import {config as dotconfig} from 'dotenv'
dotconfig();
import 'reflect-metadata'
import {InversifyExpressServer} from 'inversify-express-utils';
import container from './config/inversify.config.';
import { Env } from './config/env';
import cors from 'cors'

const app = express();

const server = new InversifyExpressServer(container, null, null, app);

server.setConfig((app) => {
  app.use(express.json());
  app.use(cors());
});

const serverInstance = server.build()
const PORT = Env.all().port;

if(process.env.NODE_ENV !== 'testing'){
    serverInstance.listen(PORT, () => console.log(`server running on ${PORT}`))
}
