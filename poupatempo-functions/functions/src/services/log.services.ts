import express = require("express");

import errorDto from "../dtos/error.dto";

import httpStatusHelper from "../helpers/http-status.helper";

class logService {

    static logErrorAndSend = (req: express.Request, res: express.Response, error: errorDto, _function: string) => {

        if (error.custom) {
            httpStatusHelper.sendError(req, res, error);
        } else {

            logService.logError(
                error,
                req,
                _function);

            httpStatusHelper.sendInternalError(req, res, '', error.message);
        }
    }

    static logError = (error: errorDto, req: express.Request, _function: string) => {

    }
}

export default logService;