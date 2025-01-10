const mapsService = require('../services/maps.service');
const {validationResult} = require('express-validator');

const getAddressCoordiantes = async (req,res) => { 
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await mapsService.getAddressCoordiantes(req.query.address);
        return res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
}

const getDistance = async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const response = await mapsService.getDistance(req.query.origin, req.query.destination);
        return res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
}

const getSuggestions = async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const suggestions = await mapsService.getSuggestions(req.query.address);
        
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    getAddressCoordiantes,
    getDistance,
    getSuggestions
}