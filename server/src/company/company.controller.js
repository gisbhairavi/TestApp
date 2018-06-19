const Company = require('./company.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../user/user.controller');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    Company.get(id)
        .then((company) => {
            req.company = company; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {Company}
 */
function get(req, res) {
    return res.json(req.company);
}

/**
 * Create new Company
 * @property {string} req.body.company_name - The company_name of user.
 * @property {string} req.body.company_address - The company_address of user.
 * @returns {Company}
 */
function create(req, res, next) {
    const token = jwt.sign({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        website: req.body.website
    }, config.jwtSecret);

    User.findUserByEmail(req.body.email).then((userObj, err) => {
        if (!userObj) {
            const company = new Company({
                company_name: req.body.company_name,
                company_address: req.body.company_address,
                website: req.body.website,
                access_token: token
            });

            company.save()
                .then(savedCompany => {
                    req.body.company = savedCompany._id;

                    User.createUser(req.body);
                    res.json(savedCompany)
                })
                .catch(e => next(e));
        } else {
            throw new Error("Email already Exists!");
        }
    }).catch(error => {
        res.status(500).json({error: error.toString()});
    });
}


function update(req, res, next) {
    const user = req.company;
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
 * @returns {Company[]}
 */
function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;
    Company.list({limit, skip})
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {Company}
 */
function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

module.exports = {load, get, create, update, list, remove};
