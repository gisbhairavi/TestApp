const Promise = require('bluebird');
const bcrypt    =   require('bcrypt');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const Schema = mongoose.Schema;
/**
 * User Schema
 */
const UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    company: {type: Schema.Types.ObjectId, ref: 'Company'},
    email: {
        type: String,
        required: true
    },
    userlevel: {
        type: String,
        enum: ['superadmin', 'admin', 'manager', 'associate'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, config.saltRounds, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({skip = 0, limit = 50} = {}) {
        return this.find()
            .sort({createdAt: -1})
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    findByEmail(email) {
        return this.findOne({ email: email }).exec();
    },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
