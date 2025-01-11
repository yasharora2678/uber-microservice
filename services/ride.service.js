const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

const getFare = async ({pickup, destination}) => {
    if(!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }

    const distanceTime = await mapService.getDistance(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;

}

function generateOtp(num) {
    const min = Math.pow(10, num - 1); 
    const max = Math.pow(10, num);
    
    return crypto.randomInt(min, max).toString();
}

const createRide = async (payload, user) => {
    const {pickup, destination, vehicleType} = payload
    const fare = await getFare({pickup, destination});

    const ride = new rideModel({
        user: user._id,
        pickup,
        destination,
        otp: generateOtp(6),
        fare: fare[vehicleType]
    });

    await ride.save();
    return ride;
}

const confirmRide = async (payload, captain) => { 
    const { rideId } = payload;
    await rideModel.findByIdAndUpdate(rideId, {
        status: 'accepted',
        captain: captain._id
    });
    
    const ride = await rideModel.findOne({_id: rideId}).populate('captain user').select('+otp');
    if(!ride) throw new Error('Ride not found');
    return ride;
}

const startRide = async (params) => { 
    const { rideId, otp } = params;
    const ride =  await rideModel.findOne({_id: rideId}).populate('captain user').select('+otp');
    console.log(ride)
    if(ride.otp != otp) {
        throw new Error('Otp is invalid')
    }

    await rideModel.findByIdAndUpdate(rideId, {
        status: 'ongoing',
    });
    return ride;
}

const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

module.exports = {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
}