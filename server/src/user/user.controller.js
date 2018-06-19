const bcrypt    =   require('bcrypt');
const User      =   require('./user.model');
const config = require('../../config/config');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
    console.log('******JAHIR USER******');
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        company: req.body.company,
        email: req.body.email,
        userlevel: req.body.userlevel,
        mobile: req.body.mobile
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;
    User.list({limit, skip})
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}


function createUser(userObj) {
    console.log('******JAHIR USER erhere******');

    const user = new User({
        fname: userObj.fname,
        lname: userObj.lname,
        password: userObj.password,
        company: userObj.company,
        email: userObj.email,
        userlevel: userObj.userlevel,
        mobile: userObj.mobile
    });

    return user.save();
}

function findUserByEmail(email, next) {

    return User.findByEmail(email);
}

module.exports = {load, get, create, update, list, remove, createUser, findUserByEmail};
