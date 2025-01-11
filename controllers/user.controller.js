const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await userService.registerUser(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await userService.loginUser(req.body);
        res.cookie('token', response.token);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({user: req.user});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const logOutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        await userService.logOutUser(req);
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logOutUser
}