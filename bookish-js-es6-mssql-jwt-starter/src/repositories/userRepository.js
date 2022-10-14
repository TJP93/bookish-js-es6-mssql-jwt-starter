
import {executeSql} from '../helpers/dbHelper.js';
import User from '../models/user.js';

export default class UserRepository {
    // validate username/password
    getAuthenticatedUser(username, password) {
        // TODO implement check password, do this in a query, don't retrieve password
    }

    // is this a valid username
    getUserByName(username) {
          // TODO implement retrieve user info, but not the secret 

    }
}
