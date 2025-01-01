const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const { get } = require('http');

const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await captainService.registerCaptain(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await captainService.loginCaptain(req.body);
        res.cookie('token', response.token);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getCaptainProfile = async (req, res) => {
    try {
        res.status(200).json(req.captain);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const logOutCaptain = async (req, res) => {
    try {
        res.clearCookie('token');
        await captainService.logOutCaptain(req);
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logOutCaptain
}