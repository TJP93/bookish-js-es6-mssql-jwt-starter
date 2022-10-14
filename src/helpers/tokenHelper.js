import { secret } from "../config.js";

import jwt from 'jsonwebtoken';

export function createTokenForUser(user) {
    return jwt.sign({ username: user.username }, secret);
}

export function isTokenValid(token) {
    if (!token) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, secret);
        return decoded?.username;
    } catch (e) {
        return false;
    }
}