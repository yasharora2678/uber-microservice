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
        res.status(400).send(error.message);
    }
}


module.exports = {
    registerUser
}