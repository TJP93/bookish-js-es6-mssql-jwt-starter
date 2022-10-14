

import { isTokenValid } from '../helpers/tokenHelper.js';
import express, { request } from 'express';

function makeAuthenticationRouter(){
    let router = express.Router();
    router.use((req, res, next) => {
        const token = req.headers['x-access-token'];
        let username = isTokenValid(token);
        if (!!username) {
            req["user"] = username;
            next();
        } else {
            return res.status(403).send({
                success: false,
                message: 'Invalid token'
            });
        }
    });
    return router;
}

export default makeAuthenticationRouter();