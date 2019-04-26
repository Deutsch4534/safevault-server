let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    db_insert = require('../db-functions/insert'),
    db_delete = require('../db-functions/delete'),
    db_read = require('../db-functions/read'),
    db_update = require('../db-functions/update'),
    utilsFunction = require('../utils/functions');


////////////////////////////////////////////////////  EMAIL  /////////////////////////////////////////////////////////////

/**
 * @api {get} /products Gets all products
 * @apiGroup Product
 * @apiName GetsAllProducts
 * @apiSuccessExample {json} Success
 * {
 *  "responseCode": 200,
 *  "responseMessage": "Success",
 *  "data": {
 *      "result": [
 *          {
 *              "product_images": [
 *                "product1_img1,product1_img2,t"
 *             ],
 *              "weight": [
 *                  2,
 *                  3,
 *                  4,
 *                  6,
 *                  7,
 *                  8,
 *                  9,
 *                  10
 *              ],
 *              "color": [
 *                  "White",
 *                  "Black"
 *              ],
 *              "_id": "5c7fac501b75235146ecdd7c",
 *              "title": "White Rock Himalayan Salt Lampp",
 *              "banner_img_url": "Img5",
 *              "description": "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *              "price": "4500",
 *              "short_title_description": "Available in all four colors",
 *              "category": "natural shaped lamps",
 *              "rating": 5,
 *              "__v": 0
 *          },
 *          {
 *             "product_images": [
 *                  "product1_img1",
 *                  "product1_img2",
 *                  "t"
 *              ],
 *              "weight": [
 *                  2,
 *                  3,
 *                  4,
 *                 6,
 *                  7,
 *                  8,
 *                  9,
 *                  10
 *              ],
 *              "color": [
 *                  "White",
 *                  "Black"
 *              ],
 *              "_id": "5c7fad7d6573735228f67430",
 *              "title": "White Rock Himalayan Salt Lampp",
 *              "banner_img_url": "Img5",
 *              "description": "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *              "price": "4500",
 *              "short_title_description": "Available in all four colors",
 *              "category": "1",
 *              "rating": 5,
 *              "__v": 0
 *          }
 *      ]
 *    }
*}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */
router.get("/products", function (req, res) {
    db_read.getAllProducts().then((response) => {
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
 * @api {get} /product/:category Gets product by category
 * @apiGroup Product
 * @apiName GetsProductsByCategory
 * @apiParam {String} Category Name of category
 * @apiSuccessExample {json} Success
 * {
 *  "responseCode": 200,
 *  "responseMessage": "Success",
 *  "data": {
 *      "result": [
 *          {
 *              "product_images": [
 *                "product1_img1,product1_img2,t"
 *             ],
 *              "weight": [
 *                  2,
 *                  3,
 *                  4,
 *                  6,
 *                  7,
 *                  8,
 *                  9,
 *                  10
 *              ],
 *              "color": [
 *                  "White",
 *                  "Black"
 *              ],
 *              "_id": "5c7fac501b75235146ecdd7c",
 *              "title": "White Rock Himalayan Salt Lampp",
 *              "banner_img_url": "Img5",
 *              "description": "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *              "price": "4500",
 *              "short_title_description": "Available in all four colors",
 *              "category": "natural shaped lamps",
 *              "rating": 5,
 *              "__v": 0
 *          },
 *          {
 *             "product_images": [
 *                  "product1_img1",
 *                  "product1_img2",
 *                  "t"
 *              ],
 *              "weight": [
 *                  2,
 *                  3,
 *                  4,
 *                 6,
 *                  7,
 *                  8,
 *                  9,
 *                  10
 *              ],
 *              "color": [
 *                  "White",
 *                  "Black"
 *              ],
 *              "_id": "5c7fad7d6573735228f67430",
 *              "title": "White Rock Himalayan Salt Lampp",
 *              "banner_img_url": "Img5",
 *              "description": "100% Natural Himalayan white rock salt from the mines Of Khewra (Pakistan)Wrapped in plastic, packed in carton box with lamp wire and 120 watt bulb",
 *              "price": "4500",
 *              "short_title_description": "Available in all four colors",
 *              "category": "1",
 *              "rating": 5,
 *              "__v": 0
 *          }
 *      ]
 *    }
 *}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.get("/product/:category", function (req, res) {
    db_read.getProductByCategory(req.params.category).then((response) => {
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
