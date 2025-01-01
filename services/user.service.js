const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');

const registerUser = async (payload) => {
    const { fullname, email, password} = payload;
    const hashPassword = await userModel.hashPassword(password);

    const isEmailExist = await userModel.findOne({email});
    if(isEmailExist) throw new Error('Email already exist');
    
    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword
    })
    const token = user.generateAuthToken();
    return {token, user};
}

const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await userModel.findOne({email}).select('+password');
    if(!user) throw new Error('Invalid email or password');
    const isValid = await user.comparePassword(password);
    if(!isValid) throw new Error('Invalid email or password');
    const token = user.generateAuthToken();
    return {token, user};
}

const logOutUser = async (req) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({token});
    return;
} 

module.exports = {
    registerUser,
    loginUser,
    logOutUser
}