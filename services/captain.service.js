const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

const registerCaptain = async (payload) => {
    const { fullname, email, password, vehicle, location} = payload;
    const hashPassword = await captainModel.hashPassword(password);

    const isEmailExist = await captainModel.findOne({email});
    if(isEmailExist) throw new Error('Email already exist');

    const captain = await captainModel.create({
        fullname,
        email,
        password: hashPassword,
        vehicle,
        location
    })
    const token = captain.generateAuthToken();
    return {token, captain};
}

const loginCaptain = async (payload) => {
    const { email, password } = payload;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain) throw new Error('Invalid email or password');
    const isValid = await captain.comparePassword(password);
    if(!isValid) throw new Error('Invalid email or password');
    const token = captain.generateAuthToken();
    return {token, captain};
}

const logOutCaptain = async (req) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({token});
    return;
} 

module.exports = {
    registerCaptain,
    loginCaptain,
    logOutCaptain
}