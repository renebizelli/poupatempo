import * as express from 'express';
import { Router } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import controlerInterface from '../interfaces/controller.interface';

import controllerFactory from '../controllers/controller.factory';

class mainApplication {

    private _express: express.Application = express();

    constructor() {
        this.middlewares();
        this.controllers();
    }

    public getApp() {
        return this._express;
    }

    private middlewares() {
        this._express.use(bodyParser.urlencoded({ extended: true }));
        this._express.use(cors());
    }

    private controllers() {

        let controllers: controlerInterface[] = controllerFactory.all();

        const router: Router = express.Router();

        controllers.forEach((c) => {
            c.setRouter(router);
        });

        this._express.use('/', router);
    }


}

export default mainApplication;