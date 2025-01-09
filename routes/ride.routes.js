const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { body } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");

router.post(
  "/create",
  body("user")
    .isLength({ min: 24, max: 24 })
    .withMessage("User ID is required"),
  body("pickup").isLength({ min: 3 }).withMessage("Pickup is required"),
  body("destination")
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  body("vehicleType")
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
    authUser,
  rideController.createRide
);
// router.get("/get-all", rideController.getAllRides);
// router.get("/get/:id", rideController.getRideById);
// router.put("/update/:id", rideController.updateRide);
// router.delete("/delete/:id", rideController.deleteRide);

module.exports = router;
