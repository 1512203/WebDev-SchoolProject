var express = require('express');
var router = express.Router();
var controllers = require('../database/controllers');
var stylesController = controllers.stylesController;
var productsController = controllers.productsController;
var usersController = controllers.usersController;
var cartsController = controllers.cartsController;
var cartitemsController = controllers.cartitemsController;
var extractListOfStyleNamesHelper = require('./helpers/extractListOfStyleNames-helper');
var extractListOfProductsByRowsHelper = require('./helpers/extractListOfProductsByRows-helper.js');

router.get('/', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;

        stylesController.getAllStyleNames({}, function(error, styles) {
            if (error) res.status(400).send({message: 'Cannot find the list of styles'});
            else {
                var styleList = extractListOfStyleNamesHelper.extractListOfStyleNames(styles);
                productsController.getAllProducts({}, function(error, products) {
                    if (error) res.status(400).send({message: 'Cannot find the list of products'});
                    else {
                        var productList = extractListOfProductsByRowsHelper.extractListOfProductsByRows(products);
                        res.render('shop/index', {
                            title: 'Bán áo online',
                            email: curEmail,
                            listOfStyles: styleList,
                            listOfProducts: productList,
                        });
                    }
                });
            }
        });
    });
});

router.get('/design', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;
        res.render('shop/design', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/cooperation', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;
        res.render('shop/cooperation', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/contact', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;
        res.render('shop/contact', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/introduction', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;
        res.render('shop/introduction', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/instruction', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;
        res.render('shop/instruction', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/shoppingcartdetail', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(req.session.passport.user, function(error, user) {
        var curEmail = "";
        if (user) curEmail = user.dataValues.email;

        res.render('shop/shoppingCartDetail', {
            title: 'Bán áo online',
            email: curEmail,
        });
    });
});

router.get('/addtocart/:id', function(req, res, next) {
    var productID = req.params.id;

    productsController.findProductByID(productID, function(err, product) {
        if (err) return res.status(400).send({message: 'Cannot find the product'});

        var cartID = Boolean(req.session.cartID) ? req.session.cartID : (-1);
        if (cartID == -1) {
            cartsController.createNewShoppingCart(function(error, cart) {
                if (error) return res.status(400).send({message: 'Cannot create new cart'});
                // Update cart session
                req.session.cartID = cart.dataValues.id;
                // Add product to cart
                cartitemsController.addItemToCart(productID, cart.dataValues.id, function(error, cartitem) {
                    cartsController.addItemToCart(cartitem.dataValues.cartID, function(error) {
                        res.redirect('/');
                    });
                });
            });
        }
        else {
            // Add product to cart
            cartitemsController.addItemToCart(productID, cartID, function(error, cartitem) {
                cartsController.addItemToCart(cartitem.dataValues.cartID, function(error, cart) {
                    res.redirect('/');
                });
                // res.redirect('/');
            });
        }
    });
});

router.get('/product/:id', function(req, res, next) {
    productsController.findProductByID(req.params.id, function(error, product) {
        if (error) {
            res.status(400).send({message: 'Cannot find product by id'});
        }
        else {
            res.status(200).send(product.dataValues);
        }
    });
});

router.get('/style/:id', function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        var curEmail = "";
        if (user) {
            curEmail = user.dataValues.email;
        }
        stylesController.getAllStyleNames({}, function(error, styles) {
            if (error) {
                res.status(400).send({message: 'Cannot find the list of styles'});
            }
            else {
                var styleList = extractListOfStyleNamesHelper.extractListOfStyleNames(styles);
                productsController.getAllProducts({productStyleID: req.params.id}, function(error, products) {
                    if (error) {
                        res.status(400).send({message: 'Cannot find the list of products'});
                    }
                    else {
                        var productList = extractListOfProductsByRowsHelper.extractListOfProductsByRows(products);
                        res.render('shop/index', {
                            title: 'Bán áo online',
                            email: curEmail,
                            listOfStyles: styleList,
                            listOfProducts: productList,
                        });
                    }
                });
            }
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile');
}
