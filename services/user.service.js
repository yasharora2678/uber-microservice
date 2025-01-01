const userModel = require('../models/user');

const registerUser = async (payload) => {
    const { fullname, email, password} = payload;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword
    })
    const token = user.generateAuthToken();
    return {token, user};
}

module.exports = {
    registerUser
}