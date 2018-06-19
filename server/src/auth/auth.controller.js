const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.controller');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    User.findUserByEmail(req.body.email).then((userObj, err) => {

        if (userObj) {

            if (req.body.email === userObj.email
                    && bcrypt.compareSync(req.body.password, userObj.password)) {
                const token = jwt.sign({
                    fname: userObj.fname,
                    lname: userObj.lname,
                    email: userObj.email,
                    company: userObj.company,
                    userlevel: userObj.userlevel,
                    mobile: userObj.mobile
                }, config.jwtSecret);
                return res.json({
                    auth_token: token
                });
            } else {
                throw new APIError('Please check the Email & Password', httpStatus.UNAUTHORIZED, true);
            }
        } else {
            throw new APIError('User not found', httpStatus.UNAUTHORIZED, true);
        }
    }).catch(error => {
        res.status(500).json({error: error.toString()});
    });


    // const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    // return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}

module.exports = {login, getRandomNumber};
