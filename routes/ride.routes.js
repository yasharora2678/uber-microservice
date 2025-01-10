const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { body, query } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");

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
// router.get("/get-all", rideController.getAllRides);
// router.get("/get/:id", rideController.getRideById);
// router.put("/update/:id", rideController.updateRide);
// router.delete("/delete/:id", rideController.deleteRide);

module.exports = router;
