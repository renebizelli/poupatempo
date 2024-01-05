import baseController from "./base.controller";
import controlerInterface from "../interfaces/controller.interface";
import express = require("express");
import authService from "../services/auth.services";

class authController
    extends baseController
    implements controlerInterface {

    constructor(private authService: authService) {
        super();
    }

    setRouter(router: express.Router): void {
        router.post(this.createPublicEndpoint('login'), this.check);
    }

    private check = async (req: express.Request, res: express.Response) => {

        try {

            let identifier = req.body.identifier as string;
            let password = req.body.password as string;

            let accessToken = await this.authService.login(identifier, password);

            //let spreadsheetService = serviceFactory.spreadsheet(req.context);

            //await spreadsheetService.check();

            res.json(accessToken);

        }
        catch (error:any) {
            console.log(error)
            res.status(error.status).json(error)
        }

    }

}

export default authController;