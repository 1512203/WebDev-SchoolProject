var express = require('express');
var router = express.Router();
var controllers = require('../database/controllers');
var stylesController = controllers.stylesController;
var productsController = controllers.productsController;

/* GET home page. */
router.get('/', function(req, res, next) {
	stylesController.getAllStyleNames({}, function(error, styles) {
		console.log(error);
		if (error) {
			res.status(400).send({message: 'Cannot find the data'});
		}
		else {
			let styleNames = [];
			for (let i = 0; i < styles.length; ++i) {
				styleNames.push({
					name: styles[i].dataValues.styleName,
					id: styles[i].dataValues.id,
				});
			}
			
			productsController.getAllProducts({}, function(error, products) {
				if (error) {
					res.status(400).send({message: 'Cannot find the data'});
				}
				else {
					let productList = [];
					let nProductsInARow = 4;
					for (let i = 0, k = 0; i < products.length; i += nProductsInARow, k += 1) {
						productList.push([]);
						console.log(productList, k);
						for (let j = 0; i+j < products.length && j < nProductsInARow; ++j) {
							productList[k].push({
								productID: products[i+j].dataValues.id,
								productName: products[i+j].dataValues.productName,
								productPrice: products[i+j].dataValues.productPrice,
								productImage: products[i+j].dataValues.pathToImg,
								isRootItem: (i+j == 0),
							});
						}
						console.log(productList[k]);
					}
					console.log(productList);
					res.render('shop/index', {
						title: 'Bán áo online',
						isNotLogin: true,
						listOfStyles: styleNames,
						listOfProducts: productList,
					});
				}
			});
		}
	});
});

router.get('/style/:id', function(req, res, next) {
	stylesController.getAllStyleNames({}, function(error, styles) {
		console.log(error);
		if (error) {
			res.status(400).send({message: 'Cannot find the data'});
		}
		else {
			let styleNames = [];
			for (let i = 0; i < styles.length; ++i) {
				styleNames.push({
					name: styles[i].dataValues.styleName,
					id: styles[i].dataValues.id,
				});
			}
			res.render('shop/index', {
				title: 'Bán áo online',
				isNotLogin: true,
				styleLists: styleNames,
			});
		}
	});
});
module.exports = router;
