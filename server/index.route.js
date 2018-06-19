const express = require('express');
const userRoutes = require('./src/user/user.route');
const authRoutes = require('./src/auth/auth.route');
const companyRoutes = require('./src/company/company.route');
const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/company', companyRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
