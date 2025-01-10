const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    body('vehicle.color')
        .notEmpty()
        .withMessage('Color is required'),
    body('vehicle.plate')
        .notEmpty()
        .withMessage('Plate is required'),
    body('vehicle.capacity')
        .notEmpty()
        .withMessage('Capacity is required')
        .isInt({ min: 1 })
        .withMessage('Capacity must be at least 1'),
    body('vehicle.type')
        .notEmpty()
        .withMessage('Type is required')
        .isIn(['car', 'moto', 'bicycle'])
        .withMessage('Type must be either car, motorcycle, or bicycle')
], captainController.registerCaptain);

router.post('/login', [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
], captainController.loginCaptain)

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logOutCaptain);

module.exports = router;