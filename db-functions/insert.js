var exports = module.exports = {},
    constants = require('../utils/constant'),
    utilsFunctions = require('../utils/functions'),
    participantModel = require('../models/participant'),
    certificateModel = require ('../models/certificate');

exports.insertParticipant = async (participant) => {
    try {
        await participantModel.create(participant);
        return constants.responseMessages.participantCreated;
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.insertCertificates = async (certificate) => {
    try {
        return await certificateModel.create(certificate);
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

