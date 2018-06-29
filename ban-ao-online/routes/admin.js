var express = require('express');
var router = express.Router();
var passport = require('passport');

var controllers = require('../database/controllers');
var stylesController = controllers.stylesController;
var productsController = controllers.productsController;
var usersController = controllers.usersController;
var ordersController = controllers.ordersController;
var cartsController = controllers.cartsController;

var extractListOfStyleNamesHelper = require('./helpers/extractListOfStyleNames-helper');
var extractListOfProductsByRowsHelper = require('./helpers/extractListOfProductsByRows-helper');
var extractListOfOrders = require('./helpers/extractListOfOrders-helper');
var extractListOfAllOrders = require('./helpers/extractListOfAllOrders-helper');
var extracListOfCartItemsOfOrder = require('./helpers/extractListOfCartItemsOfOrder-helper');
var extractSumList = require('./helpers/extractSumList-helper');
var extractListOfProducts = require('./helpers/extractListOfProducts-helper');
var extractListOfUsers = require('./helpers/extractListOfUsers-helper');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var csrf = require('csurf');

var csrfProtection = csrf();

var productSortType = "DESC";


router.use(csrfProtection);

router.get('/editproduct/:productID', isLoggedIn, function(req, res, next) {
    console.log(req.params.productID);
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        console.log(req.params.productID);
        productsController.findProductByID(req.params.productID, function(error, product) {
            if (!error && product !== undefined) {
                var messages = req.flash('error');
                console.log(product);
                return res.send({
                    csrfToken: req.csrfToken(),
                    messages: messages,
                    hasErrors: messages.length > 0,
                    productID: product.dataValues.id,
                    productName: product.dataValues.productName,
                    productDesp: product.dataValues.productDescription,
                });
            }
            return res.status(400).send({});
        });
    });
});

router.post('/editproduct/:productID', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        productsController.updateProductInfo(req.body.productName, req.body.productDesp, req.params.productID, function(error) {
            if (!error) {
                return res.redirect('/admin/manageproducts');
            }
            return res.status(400).send({mess: 'Error!'});
        });
    });
});

router.get('/deleteproduct/:productID', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        productsController.findProductByID(req.params.productID, function(error, product) {
            if (!error && product !== undefined) {
                product.destroy();
                return res.status(200).send({});
            }
            return res.status(400).send({});
        });
    });
});

router.get('/managestyles', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        stylesController.getAllStyles(function(error, styles) {
            res.render('admin/managestyles', {
                styles: styles,
                isAdmin: true,
                title: "Bán áo online",
                email: user.dataValues.email,
            });
        });
    });
});

router.get('/changeStatus/:accID', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        usersController.changeStatus(req.params.accID, function(error) {
            if (!error) return res.send(200);
            else return res.send(400);
        });
    });
});

router.get('/changeorderstatus/:ordID/:newStatus', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        ordersController.changeStatus(req.params.ordID, req.params.newStatus, function(error) {
            if (!error) return res.send(200);
            else return res.send(400);
        });
    });
});

router.get('/manageaccounts', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin)
            return res.redirect('/');

        usersController.getAllUsers({isAdmin: false,}, function(error, users) {
            var usersList = extractListOfUsers.extractListOfUsers(users);
            res.render('admin/manageaccounts', {
                users: usersList,
                isAdmin: true,
                title: "Bán áo online",
                email: user.dataValues.email,
            });
        });
    });
});

router.get('/manageproducts', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin) 
            return res.redirect('/');

        productsController.getAllProductsOrders('ASC',function(error, products) {
            var productsList = extractListOfProducts.extractListOfProducts(products);
            res.render('admin/manageproducts', {
                csrfToken: req.csrfToken(),
                isAdmin: true,
                products: productsList,
                title: "Bán áo online",
                email: user.dataValues.email,
            });
        });
    });
});

router.get('/manageproducts/changeSortType', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin) 
            return res.redirect('/');

        if (productSortType == 'DESC'){
            productSortType = 'ASC';
        }
        else{
            productSortType = 'DESC';
        }
        productsController.getAllProductsOrders(productSortType,function(error, products) {
            var productsList = extractListOfProducts.extractListOfProducts(products);
            res.render('admin/manageproducts', {
                csrfToken: req.csrfToken(),
                isAdmin: true,
                products: productsList,
                title: "Bán áo online",
                email: user.dataValues.email,
            });
        });
    });
});


router.post('/manageproducts/filterbyprice',urlencodedParser, function(req,res){
    var priceStart= 1;
    var priceEnd= 100;
    var priceSelect = req.body.myselect;
    var tempobj = {};
    if (priceSelect == 0) {
        return res.redirect('/admin/manageproducts');
    }
    if (priceSelect == 100) {
        tempobj.is0 = true;
    }
    else if (priceSelect == 101) {
        tempobj.is1 = true;
        priceStart = 101;
        priceEnd = 150;
    }
    else if (priceSelect == 151) {
        tempobj.is2 = true;
        priceStart = 151;
        priceEnd = 200;
    }
    else if (priceSelect == 201) {
        tempobj.is3 = true;
        priceStart = 201;
        priceEnd = 10000;
    }
    priceStart *= 1000;
    priceEnd *= 1000;
    
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin) 
            return res.redirect('/');

        productsController.getAllProductsFilterByPrice(priceStart, priceEnd,function(error, products) {
            var productsList = extractListOfProducts.extractListOfProducts(products);
            console.log(productsList);
            res.render('admin/manageproducts', {
                csrfToken: req.csrfToken(),
                isAdmin: true,
                products: productsList,
                title: "Bán áo online",
                email: user.dataValues.email,
                tempobj: tempobj,
            });
        });
    });
    
});

router.post('/manageproducts/searchbyname',urlencodedParser, function(req,res){
   
    var searchString = req.body.input-search;
    
    productsController.getProductsFilterSearchString(searchString,function(error, products) {
        var productsList = extractListOfProducts.extractListOfProducts(products);
        res.render('admin/manageproducts', {
            isAdmin: true,
            products: productsList,
            title: "Bán áo online",
            email: user.dataValues.email,
        });
    });
    
});

router.get('/dashboard', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user.dataValues.isAdmin) 
            return res.redirect('/');

        ordersController.getOrdersPriceForStatistic(function(error, groupedOrders) {
            var groupedOrdersExtracted = extractSumList.extractSumList(groupedOrders);
            ordersController.getAllOrdersFromAllUsers(function(error, orders) {
                if (orders === undefined) 
                    return res.redirect('/');

                var extractedList = extractListOfAllOrders.extractListOfAllOrders(orders);
                return res.render('admin/dashboard', {
                    isAdmin: true,
                    groupedOrders: groupedOrders,
                    carts: extractedList.carts,
                    totalMoney: extractedList.totalMoney,
                    totalQuantity: extractedList.totalQuantity,
                    title: "Bán áo online",
                    email: user.dataValues.email,
                });
            });
        });
    });
});

router.get('/getcartinfo/:cartid', isLoggedIn, function(req, res, next) {
    ordersController.getOrderDetailInformationByOrderID(req.params.cartid, function(error, order) {
        var sentData = extracListOfCartItemsOfOrder.extractListOfCartItemsOfOrder(order);
        res.send(sentData);
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
    res.redirect('/');
}
