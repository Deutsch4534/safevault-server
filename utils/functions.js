var exports = module.exports = {},
    fs = require('fs'),
    encryptor = require('file-encryptor'),
    constants = require('../utils/constant'),
    sha256File = require('sha256-file'),
    {generateMnemonic, EthHdWallet} = require('eth-hd-wallet'),
    encrypt = require('node-file-encrypt');
    constant = require('../utils/constant');

var azure = require('azure-storage');


var fileService = azure.createFileService('safevault', 'FVRq9jdWI4XXbE6EZ/FAypP5M6KxcVpwTwKT1LrNwS7Ei42NicH4UWDuNkF8bd9MLDMvWNVlr5pv+LufuJN+Ug==');

var options = { algorithm: 'aes256' };


exports.decryptFileWithPublicKey = async (key, file) => {
    try {

    } catch (e) {

    }
};

// let encryptPath = '';
//
// exports.decryptFileWithPublicKey = async (key, file) => {
//     try {
//         fs.unlink(file.path, function() {});
//         let f = new encrypt.FileEncrypt(encryptPath);
//         f.openSourceFile();
//         f.decrypt('111111');
//         console.log("decrypt sync done");
//     } catch (e) {
//
//     }
// };
//
// exports.encryptFileWithPublicKey = async (key, file) => {
//     try{
//         let f = new encrypt.FileEncrypt('decrypted');
//         f.openSourceFile();
//         f.encrypt('111111');
//         encryptPath = f.encryptFilePath;
//         console.log("encrypt sync done");
//     } catch (e) {
//
//     }
// };
exports.encryptFileWithPublicKey = async (key, file) => {
    try {
        console.log(file)
        await encryptor.encryptFile(file.path, `encrypted/${file.originalname}`, key,  function (err) {
            if(err){
                console.log(err)
            }
            return `encrypted/${file.originalname}`;
        });
        await encryptor.decryptFile(`encrypted/${file.originalname}`, 'decrypted/fff.jpg', key,  function (err) {
            if(err){
                console.log(err)
            }
            console.log("here")
        });
    } catch (e) {

    }
};
exports.getFileNamesFromPublicKey = async (public_key) => {
    try {
        fileService.listFilesAndDirectoriesSegmented(constants.shareName,public_key,null , function(error,result,reponse) {
            return result.entries.files;
        })
    }catch (e) {
        console.log(e);
    }
};



exports.generatePublicKeyFromMnemonic = async (mnemonic) => {
    try {
        const wallet = EthHdWallet.fromMnemonic(mnemonic);
        const addresses = wallet.generateAddresses(1);
        return addresses[0];
    } catch (e) {
        console.log(e);
    }
};

exports.generateMnemonic = async () => {
    try {
        return await generateMnemonic();
    } catch (e) {
        console.log(e);
    }
};

exports.deleteFile = (file) => {
    try {
        console.log(file)
        fs.unlink(`uploads/${file.filename}`, function () {
            console.log("Deleted")
        });
    } catch (e) {

    }
};


exports.uploadFileToAzure = async (file, public_key ,hash) => {
    try {
        await fileService.createShareIfNotExists(constants.shareName, function (error, result, response) {
            if (!error) {
                // if result = true, share was created.
                // if result = false, share already existed.
            }
        });

        await fileService.createDirectoryIfNotExists(constants.shareName, public_key, function (error, result, response) {
            if (!error) {
                // if result.created = true, share was created.
                // if result.created = false, share already existed.
            }
        });

        await fileService.createFileFromLocalFile(constants.shareName, public_key,file.originalname+"-"+hash, file.path, function (error, result, response) {
            if (!error) {
                // file uploaded
            }
            exports.deleteFile(file.originalname)
        });

    } catch (e) {
        console.log(e)
    }
};


exports.downloadFile = function (address,file_name , callback) {
    try {
        let localFileAddress = "azure_downloads/"+file_name;
        fileService.getFileToLocalFile(constants.shareName,address,file_name,localFileAddress, function() {
            callback(localFileAddress)
        });

    }catch (e) {

    }
}

exports.calculateHashOfFile = async (file) => {
    try {
        return await  sha256File(file);
    }catch (e) {

    }
}

exports.isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};


exports.isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

exports.generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
