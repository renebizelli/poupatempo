import express = require("express");

module.exports = (req: express.Request, res: express.Response, next: any): void => {

    if (!req.headers.authorization) {
        res.status(401).json({ success: false, message: "Unauthorizated" });
        return;
    }

    next();
}