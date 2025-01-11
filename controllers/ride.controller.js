const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service")
const rideModel = require('../models/ride.model');
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");

const createRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {pickup} = req.body;
    const ride = await rideService.createRide(req.body, req.user);
    
    res.status(201).json(ride);
    const pickupCordinates = await mapService.getAddressCoordiantes(pickup);
    const captainInRadius = await mapService.getCaptainInTheRadius(pickupCordinates.ltd, pickupCordinates.lng, 2000);
    ride.otp = "";

    const rideWithUser = await rideModel.findById(ride._id).populate('user');
    captainInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser
      })
  })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

const getFare = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const fare = await rideService.getFare(req.query);
    res.status(201).json(fare);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const confirmRide = async (req, res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ride = await rideService.confirmRide(req.body, req.captain);
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })
    res.status(201).json(ride);
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const startRide = async (req, res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.params)
    const ride = await rideService.startRide(req.query, req.captain);
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    })
    res.status(200).json(ride);
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
      const ride = await rideService.endRide({ rideId, captain: req.captain });

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-ended',
          data: ride
      })
      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide
};
