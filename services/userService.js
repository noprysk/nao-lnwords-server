const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("./../model/user");
const logger = require("./../logger/logger");

async function register(first_name, last_name, email, password) {
    try {
        logger.info(`register a new user: ${email}`);

        // validate user input
        if (!(email && password && first_name && last_name)) {
            throw new Error("All input is required");
        }

        // check if user already exist
        const oldUser = await User.findOne({email});

        if (oldUser) {
            throw new Error("User Already Exist. Please Login");
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user
        return await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            roles: ["USER"]
        });
    } catch (err) {
        console.log(err);
        throw new Error("Internal Server Error! Please try later!");
    }
}

async function login(email, password) {
    try {
        // validate user input
        if (!(email && password)) {
            throw new Error("All input is required");
        }
        // validate if user exist
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // create token
            user.token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.TOKEN_EXPIRE_IN || "2h"
                }
            );

            return user;
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
        throw new Error("Internal Server Error! Please try later!");
    }
}

module.exports = {
    register,
    login
}