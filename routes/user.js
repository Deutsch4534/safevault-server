let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    functions = require('../utils/functions'),
    multer  = require('multer'),
    db_insert = require('../db-functions/insert'),
    db_read = require('../db-functions/read');


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    }
})

var upload = multer({ storage: storage });



router.post("/download-file", function (req, res) {
    db_read.returnFile(req.body.address , req.body.file_name , function (result) {
            res.download(result)
    })
});

router.post("/get-hash", function (req, res) {
    db_read.returnFileHash(req.body.address , req.body.file_name , async function (result) {
       let hash = await functions.calculateHashOfFile(result);
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: hash
                }
            }
        )
    })
});

router.post("/upload-file",  upload.single('my-file'), function (req, res) {
    db_insert.insertFile(req.file , req.body.address ).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


router.post("/files-by-address" , async function (req, res) {
   db_read.returnFilesName(req.body.address,function (result) {
       if(result === "No files found"){
           res.status(500).send( {
               responseCode: 500,
               responseMessage: result
           })
       }
       else {
           res.status(200).send( {
               responseCode: 200,
               responseMessage: result
           })
       }
   })
});



module.exports = router;
