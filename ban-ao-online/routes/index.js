var express = require('express');
var router = express.Router();
var controllers = require('../database/controllers');
var stylesController = controllers.stylesController;
var productsController = controllers.productsController;
var extractListOfStyleNamesHelper = require('./extractListOfStyleNames-helper');
var extractListOfProductsByRowsHelper = require('./extractListOfProductsByRows-helper.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	stylesController.getAllStyleNames({}, function(error, styles) {
		console.log(error);
		if (error) {
			res.status(400).send({message: 'Cannot find the list of styles'});
		}
		else {
            var styleList = extractListOfStyleNamesHelper.extractListOfStyleNames(styles);
            productsController.getAllProducts({}, function(error, products) {
                if (error) {
					res.status(400).send({message: 'Cannot find the list of products'});
				}
				else {
                    var productList = extractListOfProductsByRowsHelper.extractListOfProductsByRows(products);
					res.render('shop/index', {
						title: 'Bán áo online',
						isNotLogin: true,
						listOfStyles: styleList,
						listOfProducts: productList,
					});
				}
			});
		}
	});
});

router.get('/product/:id', function(req, res, next) {
    console.log(req.params.id);
    productsController.findProductByID(req.params.id, function(error, product) {
        if (error) {
            res.status(400).send({message: 'Cannot find product by id'});
        }
        else {
            res.status(200).send(product.dataValues);
        }
    });
});
module.exports = router;
