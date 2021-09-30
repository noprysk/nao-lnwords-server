
const Group = require("./../model/group");
const logger = require("./../logger/logger");

async function getGroups(user_email) {
    try {
        logger.info(`get groups by: ${user_email}`);

        // validate user input
        if (!user_email) {
            throw new Error("User required");
        }

        return  await Group.find({user_email});
    } catch (err) {
        console.log(err);
        throw new Error("Internal Server Error! Please try later!");
    }
}

async function saveGroup(name, description, user_email) {
    logger.info(`save group: ${name}`);

    try {
        return await Group.create({
            name,
            description,
            user_email
        });
    } catch (err) {
        console.log(err);
        throw new Error("Internal Server Error! Please try later!");
    }
}

module.exports = {
    getGroups,
    saveGroup
}