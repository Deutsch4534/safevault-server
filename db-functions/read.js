var exports = module.exports = {},
    azure = require('azure-storage'),
    fs = require('fs'),
    path = require('path'),
    functions = require('../utils/functions'),
    constants = require('../utils/constant'),
    fileModel = require('../models/file');

var fileService = azure.createFileService('safevault', 'FVRq9jdWI4XXbE6EZ/FAypP5M6KxcVpwTwKT1LrNwS7Ei42NicH4UWDuNkF8bd9MLDMvWNVlr5pv+LufuJN+Ug==');
let directory = "azure_downloads";


exports.returnFileHash =function (address ,file_name , callback ) {
    try {
        functions.downloadFile(address , file_name , async function (result) {
          callback(result);
        })
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.returnFile =function (address ,file_name , callback) {
    try {
        let localFileAddress = "azure_downloads/"+file_name;
       fileService.getFileToLocalFile(constants.shareName,address,file_name,localFileAddress, function() {
                callback(localFileAddress)
        });
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.returnFilesName= function (address, callback)  {
    try {
        fileService.listFilesAndDirectoriesSegmented(constants.shareName,address,null ,  function(error,result,response) {
            console.log(result)
            if(result === null){
                callback("No files found")
            }
            if(result!=null){
                callback (result.entries.files)
            }
        });
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
