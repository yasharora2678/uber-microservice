const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const captainRoutes = require('./captain.routes');

router.use('/users', userRoutes);
router.use('/captains', captainRoutes);

module.exports = router;