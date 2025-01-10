const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

const getFare = async (pickup, destination, vehicleType) => {
    if(!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }

    const distanceStr = await mapService.getDistance(pickup, destination);
    const distance = parseFloat(distanceStr.replace(' km', ''));

    let fare;
    switch(vehicleType) {
        case 'auto':
            fare = distance * 10; 
            break;
        case 'car':
            fare = distance * 15;
            break;
        case 'motorcycle':
            fare = distance * 8; 
            break;
        default:
            throw new Error('Invalid vehicle type');
    }

    return fare;

}

function generateOtp(num) {
    const min = Math.pow(10, num - 1); 
    const max = Math.pow(10, num);
    
    return crypto.randomInt(min, max).toString();
}

const createRide = async ({pickup, destination, vehicleType}, user) => {
    const fare = await getFare(pickup, destination, vehicleType);

    const ride = new rideModel({
        user: user._id,
        pickup,
        destination,
        otp: generateOtp(6),
        fare
    });

    await ride.save();
    return ride;
}

module.exports = {
    createRide,
    getFare
}