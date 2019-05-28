var exports = module.exports = {},
    constants = require('../utils/constant'),
    functions = require('../utils/functions'),
    fs = require('fs'),
    fileModel = require('../models/file');

exports.insertFile = async (file ,address) => {
    try {
        const address ="0xC0eB7c1828d6818697dd1D1589d1A5F714FF84EF";
        const fileHash = await functions.calculateHashOfFile(file.path);
       await functions.uploadFileToAzure(file ,address , fileHash);
       return fileHash;

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};



