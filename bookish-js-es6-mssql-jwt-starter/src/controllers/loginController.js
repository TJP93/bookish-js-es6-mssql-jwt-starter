import UserRepository from '../repositories/userRepository.js';
import { createTokenForUser } from '../helpers/tokenHelper.js';

import express from 'express';

class LoginController {
    constructor() {
        this.userRepository = new UserRepository();
        this.router = express.Router();
        this.router.get('/', this.login.bind(this));
    }

    login(request, response) {
        const username = request.query.username;
        const password = request.query.password;
        if (!username || !password) {
            response.status(400).send({errors: ['Query params must contain both `username` and `password`']})
        } else {
            // TODO validate using repository
        }
    }
}

export default new LoginController().router;
