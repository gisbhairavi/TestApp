const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const companyCtrl = require('./company.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/company - Get list of Company */
  .get(companyCtrl.list)

  /** POST /api/company - Create new Company */
  .post(validate(paramValidation.createCompany), companyCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get Company */
  .get(companyCtrl.get)

  /** PUT /api/users/:userId - Update Company */
  .put(validate(paramValidation.updateUser), companyCtrl.update)

  /** DELETE /api/users/:userId - Delete Company */
  .delete(companyCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', companyCtrl.load);

module.exports = router;
