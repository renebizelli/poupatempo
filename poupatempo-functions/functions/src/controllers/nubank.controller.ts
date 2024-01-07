import baseController from "./base.controller";
import controlerInterface from "../interfaces/controller.interface";
import express = require("express");
import nubankService from "../services/nubank.services";

const isAdmin = require("../middlewares/authenticated.middleware")

class nubankController
    extends baseController
    implements controlerInterface {

    constructor(private nubankService: nubankService) {
        super();
    }

    setRouter(router: express.Router): void {
        router.get(this.createPrivateEndpoint('bills'), isAdmin, this.bills);
    }

    private bills = async (req: express.Request, res: express.Response) => {

        try {

            let access_token = req.headers.authorization || '';

           let r = await this.nubankService.bills(access_token);

            res.json(r);
        }
        catch (error:any) {
            console.log(error)
            res.status(error.status).json(error)
        }

    }

}

export default nubankController;