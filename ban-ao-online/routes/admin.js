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

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/dashboard', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (user.dataValues.isAdmin) {
            ordersController.getAllOrdersFromAllUsers(function(error, orders) {
                if (orders === undefined) {
                    return res.redirect('/user/logout');
                }
                else {
                    var extractedList = extractListOfAllOrders.extractListOfAllOrders(orders);
                    console.log(extractedList);
                    return res.render('admin/dashboard', {
                        isAdmin: true,
                        carts: extractedList.carts,
                        totalMoney: extractedList.totalMoney,
                        totalQuantity: extractedList.totalQuantity,
                        title: "Bán áo online",
                        email: user.dataValues.email,
                    });
                }
            });
        }
        else {
            return res.redirect('/');
        }
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
