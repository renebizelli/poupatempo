import endpointHelper from "../helpers/endpoint.helper";
import express = require("express");
import errorDto from "../dtos/error.dto";
import logService from "../services/log.services";

class baseController {

    private endpointHelper: endpointHelper = new endpointHelper();

    public createPublicEndpoint(path: string): string {
        return this.endpointHelper.createPublic(path);
    }

    public createRestrictedEndpoint(path: string): string {
        return this.endpointHelper.createRestricted(path);
    }

    public createPrivateEndpoint(path: string): string {
        return this.endpointHelper.createPrivate(path);
    }

    public logErrorAndSend(req: express.Request, res: express.Response, error: errorDto, namespace: string): void {
        logService.logErrorAndSend(req, res, error, namespace);
    }
}

export default baseController