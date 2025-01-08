const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/maps.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.get('/get-coordinates', 
    query('address').isLength({min: 3}).withMessage('Address is required'),
 authUser, mapsController.getAddressCoordiantes);

router.get('/get-distance',
    query('origin').isLength({min: 3}).withMessage('Origin is required'),
    query('destination').isLength({min: 3}).withMessage('Destination is required'),
 authUser, mapsController.getDistance);

router.get('/get-suggestions',
    query('address').isLength({min: 3}).withMessage('Address is required'),
 authUser, mapsController.getSuggestions);

module.exports = router;