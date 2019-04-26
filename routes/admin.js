let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    db_insert = require('../db-functions/insert'),
    db_delete = require('../db-functions/delete'),
    jwt = require('jsonwebtoken'),
    db_read = require('../db-functions/read'),
    db_update = require('../db-functions/update'),
    utilsFunction = require('../utils/functions');

function verifyToken(req, res, next) {

    let token = req.body['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false, message: 'No token provided.'});
    jwt.verify(token, constants.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}



/**
 * @api {post} /admin/login  Signs In The EndUser
 * @apiGroup Auth
 *@apiName Login
 *  @apiParamExample {json} Input
 *    {
 *      "email": "email@example.com",
 *      "password" : "12345678"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 200,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *                      "auth": true,
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjFkZTIyZWQ5MzA2MDAxNjRhYzkzYSIsImlhdCI6MTU0NTcyMzQ1MywiZXhwIjoxNTQ1ODA4MDUzfQ.82kXmuOOZAx2Yjt-oJev7dELQ3IyLTntqezVcDVf6eo",
 *                      "user": {
 *                          "_id": "5c21de22ed930600164ac93a",
 *                          "email": "123@123.com",
 *                          "__v": 0
 *                      }
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.post('/login', function (req, res) {
    db_read.authenticateAdmin(req.body).then((response) => {

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

/**
 * @api {post} /admin/register  Registers a new admin
 * @apiGroup Auth
 *@apiName Register
 *  @apiParamExample {json} Input
 *    {
 *      "email": "email@example.com",
 *      "password" : "12345678"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *                      "auth": true,
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjFkZTIyZWQ5MzA2MDAxNjRhYzkzYSIsImlhdCI6MTU0NTcyMzQ1MywiZXhwIjoxNTQ1ODA4MDUzfQ.82kXmuOOZAx2Yjt-oJev7dELQ3IyLTntqezVcDVf6eo",
 *                      "user": {
 *                          "_id": "5c21de22ed930600164ac93a",
 *                          "email": "123@123.com",
 *                          "__v": 0
 *                      }
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.post('/register', verifyToken,function (req, res) {
    db_insert.insertAdmin(req.body).then((response) => {
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


////////////////////////////////////////////////////  EMAIL  /////////////////////////////////////////////////////////////


// POST

/**
 * @api {post} /admin/contact Inserts a Contact
 * @apiGroup Admin
 *@apiName AddContact
 *  @apiParamExample {json} Input
 *    {
 *      "email": "email@example.com",
 *      "password" : "12345678"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *                      "auth": true,
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjFkZTIyZWQ5MzA2MDAxNjRhYzkzYSIsImlhdCI6MTU0NTcyMzQ1MywiZXhwIjoxNTQ1ODA4MDUzfQ.82kXmuOOZAx2Yjt-oJev7dELQ3IyLTntqezVcDVf6eo",
 *                      "user": {
 *                          "_id": "5c21de22ed930600164ac93a",
 *                          "email": "123@123.com",
 *                          "__v": 0
 *                      }
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */



router.post("/contact", verifyToken, function (req, res) {
    console.log("/Contact")
    db_insert.insertContactDetails(req.body).then((response) => {
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

/**
 * @api {put} /admin/product Updates Contact Details
 * @apiGroup Admin
 * @apiName ContactDetailsUpdate
 * @apiParam {id} Contact Details Id
 *   @apiParamExample {json} Input
* {
 *	            "email" : "qwqwwqsddssds1d",
 *	            "phone" : ["223323",23233223,"saaasas"],
 *	            "address" : "ewewjeweweiwiewiwe"
 *
 *}
 * @apiSuccessExample {json} Success
 *{
 *   "responseCode": 201,
 *  "responseMessage": "Success",
 *  "data": {
 *     "result":  "Successfully updated contact details"
 * }
 *}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.put("/contact/:id", verifyToken,  function (req, res) {
    db_update.updateContactDetails(req.params.id,req.body).then((response) => {
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


/**
 * @api {delete} /admin/contact/:id Deletes a contact
 * @apiGroup Admin
 * @apiName Delete Contact
 * @apiParam {id} Contact ID
 * @apiSuccessExample {json} Success
 *        {
 *          "responseCode": 201,
 *             "responseMessage": "Success",
 *             "data": {
 *                  "result": "Successfully removed product"
 *             }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.delete("/contact/:id",verifyToken, function (req, res) {
    db_delete.deleteContact(req.params.id).then((response) => {
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


/**
 * @api {put} /admin/video/:id Updates Video Link
 * @apiGroup Admin
 * @apiName VideoLinkUpdate
 * @apiParam {id} Video Link Id
 *   @apiParamExample {json} Input
 * {
 *	           "link" : "www.youtube.com/weh239h23932233",
 *}
 * @apiSuccessExample {json} Success
 *{
 *   "responseCode": 201,
 *  "responseMessage": "Success",
 *  "data": {
 *     "result":  "Successfully updated video link"
 * }
 *}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.put("/video/:id",   function (req, res) {
    db_update.updateVideoLink(req.params.id,req.body).then((response) => {
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

// router.post("/video",   function (req, res) {
//     db_insert.insertVideoLink(req.body).then((response) => {
//         //SUCCESS
//         res.status(201).send(
//             {
//                 responseCode: 201,
//                 responseMessage: constants.responseMessages.Success,
//                 data: {
//                     result: response
//                 }
//             }
//         )
//     }).catch((error) => {
//         //ERROR
//         res.status(500).send(
//             {
//                 responseCode: 500,
//                 responseMessage: error.message
//             }
//         )
//     });
// });




/**
 * @api {post} /admin/product Inserts a product
 * @apiGroup Admin
 * @apiName InsertProduct
 *   @apiParamExample {json} Input
 *{
 *    "title" : "White Rock Himalayan Salt Lampp",
 *    "banner_img_url" : "Img5",
 *      "description" : "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *      "price" : "4500",
 *      "short_title_description" : "Available in all four colors",
 *      "product_images" : ["product1_img1", "product1_img2" , "t"],
 *      "weight" : [2, 3, 4, 6, 7, 8, 9, 10],
 *      "color" : ["White" , "Black"],
 *      "category" : "1",
 *      "rating" : 5
 *}
 * @apiSuccessExample {json} Success
 *{
 *   "responseCode": 201,
 *  "responseMessage": "Success",
  *  "data": {
   *     "result": "Successfully added product"
 * }
 *}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.post("/product", verifyToken,  function (req, res) {
    db_insert.insertProduct(req.body).then((response) => {
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


/**
 * @api {delete} /admin/product/:id Deletes a product
 * @apiGroup Admin
 * @apiName Delete Product
 * @apiParam {id} Product ID
 * @apiSuccessExample {json} Success
 *        {
 *          "responseCode": 201,
 *             "responseMessage": "Success",
 *             "data": {
 *                  "result": "Successfully removed product"
 *             }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.delete("/product/:id",verifyToken, function (req, res) {
    db_delete.deleteProduct(req.params.id).then((response) => {
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


/**
 * @api {put} /admin/product/:id Updates a product
 * @apiGroup Admin
 * @apiName Update Product
 * @apiParam {id} Product ID
 *   @apiParamExample {json} Input
 *{
 *    "title" : "White Rock Himalayan Salt Lampp",
 *    "banner_img_url" : "Img5",
 *      "description" : "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *      "price" : "4500",
 *      "short_title_description" : "Available in all four colors",
 *      "product_images" : ["product1_img1", "product1_img2" , "t"],
 *      "weight" : [2, 3, 4, 6, 7, 8, 9, 10],
 *      "color" : ["White" , "Black"],
 *      "category" : "1",
 *      "rating" : 5
 *}
 * @apiSuccessExample {json} Success
 *        {
 *          "responseCode": 201,
 *             "responseMessage": "Success",
 *             "data": {
 *                  "result": "Successfully updated product"
 *             }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */
router.put("/product/:id", verifyToken,function (req, res) {
    db_update.updateProduct(req.params.id, req.body).then((response) => {
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


/**
 * @api {post} /email/send-message Send message
 * @apiGroup Email
 * @apiParamExample {json} Input
 *{
 *  "email" : "ali@gmail.com",
 *   "name" :  "ali",
 *   "message" : "Please Contact me!"
}
 *
 *  }
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 200,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": Success
 *              }
 *          }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */



module.exports = router;
