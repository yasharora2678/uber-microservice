const { default: axios } = require("axios");

const getAddressCoordiantes = async (address) => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Invalid address');
        }
}

const getDistance = async (origin, destination) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    if (response.data.status === 'OK') {
        return response.data.rows[0].elements[0].distance.text;
    } else {
        throw new Error('Invalid address');
    }
}

const getSuggestions = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    if (response.data.status === 'OK') {
        return response.data.predictions;
    } else {
        throw new Error('Invalid address');
    }
}

module.exports = {
    getAddressCoordiantes,
    getDistance,
    getSuggestions
}