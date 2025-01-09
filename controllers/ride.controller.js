const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await rideService.createRide(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    createRide
}