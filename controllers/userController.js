
const { register, login } = require('./../services/userService');

const registerUser = async (req, res, next) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        const user = await register(first_name, last_name, email, password);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await login(email, password);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser
};