
const { getGroups, saveGroup } = require('./../services/groupService');

const getUserGroups = async (req, res, next) => {
    try {
        const { email } = req.user;
        const groups = await getGroups(email);
        res.status(200).json(groups);
    } catch (err) {
        next(err);
    }
};

const saveUserGroup = async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const {email} = req.user;
        const group = await saveGroup(name, description, email);
        res.status(200).json(group);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUserGroups,
    saveUserGroup
};