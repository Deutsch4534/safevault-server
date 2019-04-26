let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    db_read = require('../db-functions/read'),
    utilsFunction = require('../utils/functions');


////////////////////////////////////////////////////  CONTACT  /////////////////////////////////////////////////////////////


// POST

/**
 * @api {post} /video  Get video link
 * @apiGroup Video
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *              "result": [
 *      {
 *              "_id": "5c88f2ff2d1c1903544b0a4d",
 *              "link": "assasaas",
 *              "__v": 0
 *          }
 *      ]
 *              }
 *          }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get("/", function (req, res) {
    db_read.getVideoLink().then((response) => {
        //SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
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



module.exports = router;
