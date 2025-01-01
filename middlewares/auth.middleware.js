const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "Access denied. No token provided"});

    try{
        const isBlackListed = await blacklistTokenModel.findOne({token});
        if(isBlackListed) return res.status(401).json({message: "Unauthorized access"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }
    catch (error) {
        res.status(401).json({message: "Unauthorized access"});
    }
};

const authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "Access denied. No token provided"});

    try{
        const isBlackListed = await blacklistTokenModel.findOne({token});
        if(isBlackListed) return res.status(401).json({message: "Unauthorized access"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
    }
    catch (error) {
        res.status(401).json({message: "Unauthorized access"});
    }
};

module.exports = {authUser, authCaptain};
