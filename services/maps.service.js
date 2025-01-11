const { default: axios } = require("axios");
const captainModel = require("../models/captain.model");

const getAddressCoordiantes = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  if (response.data.status === "OK") {
    const { lat, lng } = response.data.results[0].geometry.location;
    return { ltd: lat, lng };
  } else {
    throw new Error("Invalid address");
  }
};

const getDistance = async (origin, destination) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  if (response.data.status === "OK") {
    if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
      throw new Error("No routes found");
    }

    return response.data.rows[0].elements[0];
  } else {
    throw new Error("Invalid address");
  }
};

const getSuggestions = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  if (response.data.status === "OK") {
    return response.data.predictions
      .map((prediction) => prediction.description)
      .filter((value) => value);
  } else {
    throw new Error("Invalid address");
  }
};

const getCaptainInTheRadius = async (ltd, lng, radius) => {
  // radius in km 
  
    const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};

module.exports = {
  getAddressCoordiantes,
  getDistance,
  getSuggestions,
  getCaptainInTheRadius,
};
