const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { body, query } = require("express-validator");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");

router.post(
  "/create",
  body("pickup").isLength({ min: 3 }).withMessage("Pickup is required"),
  body("destination")
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  body("vehicleType")
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  authUser,
  rideController.createRide
);

router.get(
  "/get-fare",
  query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  authUser,
  rideController.getFare
);

router.post(
  '/confirm',
  authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride Id'),
  rideController.confirmRide
)

router.get(
  '/start-ride',
  authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride Id'),
  query('otp').isString().withMessage('Otp is required'),
  rideController.startRide
)

router.post('/end-ride',
  authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  rideController.endRide
)

module.exports = router;
