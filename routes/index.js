const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const captainRoutes = require('./captain.routes');
const mapRoutes = require('./maps.routes');
const rideRoutes = require('./ride.routes')

router.use('/users', userRoutes);
router.use('/captains', captainRoutes);
router.use('/maps', mapRoutes);
router.use('/rides', rideRoutes)

module.exports = router;