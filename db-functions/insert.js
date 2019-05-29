var exports = module.exports = {},
    constants = require('../utils/constant'),
    functions = require('../utils/functions'),
    fs = require('fs'),
    fileModel = require('../models/file');

exports.insertFile = async (file ,address) => {
    try {
        const fileHash = await functions.calculateHashOfFile(file.path);
       await functions.uploadFileToAzure(file ,address , fileHash);
       return fileHash;

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};



