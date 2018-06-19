const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Company Schema
 */
const CompanySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    access_token : {
        type: String,
        required: true
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
CompanySchema.method({
});

/**
 * Statics
 */
CompanySchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((company) => {
        if (company) {
          return company;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

};

/**
 * @typedef User
 */
module.exports = mongoose.model('Company', CompanySchema);
