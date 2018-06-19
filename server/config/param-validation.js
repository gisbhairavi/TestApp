const Joi = require('joi');

module.exports = {
    // POST /api/users
    createUser: {
        body: {
            userlevel: Joi.string().required(),
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email(),
            mobile: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }
    },

    createCompany: {
        body: {
            company_name: Joi.string(),
            company_address: Joi.string(),
            website: Joi.string(),
            access_token: Joi.string(),
            userlevel: Joi.string().required(),
            fname: Joi.string().required(),
            lname: Joi.string(),
            email: Joi.string().email(),
            mobile: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }

    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            email: Joi.string().required(),
            mobile: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
