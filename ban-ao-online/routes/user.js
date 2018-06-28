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

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/loginFail', isNotLoggedIn, function (req, res, next) {
    stylesController.getAllStyleNames({}, function (error, styles) {
        if (error) res.status(400).send({ message: 'Cannot find the list of styles' });
        else {
            var styleList = extractListOfStyleNamesHelper.extractListOfStyleNames(styles);
            productsController.getAllProducts({}, function (error, products) {
                if (error) res.status(400).send({ message: 'Cannot find the list of products' });
                else {
                    var productList = extractListOfProductsByRowsHelper.extractListOfProductsByRows(products);
                    res.render('shop/index', {
                        title: 'Bán áo online',
                        listOfStyles: styleList,
                        listOfProducts: productList,
                        errorMess: 'Đăng nhập không thành công!',
                        hasError: true,
                    });
                }
            });
        }
    });
});

router.get('/signupFail', isNotLoggedIn, function (req, res, next) {
    stylesController.getAllStyleNames({}, function (error, styles) {
        if (error) res.status(400).send({ message: 'Cannot find the list of styles' });
        else {
            var styleList = extractListOfStyleNamesHelper.extractListOfStyleNames(styles);
            productsController.getAllProducts({}, function (error, products) {
                if (error) res.status(400).send({ message: 'Cannot find the list of products' });
                else {
                    var productList = extractListOfProductsByRowsHelper.extractListOfProductsByRows(products);
                    res.render('shop/index', {
                        title: 'Bán áo online',
                        listOfStyles: styleList,
                        listOfProducts: productList,
                        errorMess: 'Đăng ký không thành công!',
                        hasError: true,
                    });
                }
            });
        }
    });
});

router.get('/signup', isNotLoggedIn, function (req, res, next) {
    var messages = req.flash('error');
    res.send({
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0,
    });
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: './profile',
    failureRedirect: './signupFail',
    failureFlash: true,
}));

router.get('/login', isNotLoggedIn, function (req, res, next) {
    var messages = req.flash('error');
    res.send({
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0,
    });
});

router.post('/login', isNotLoggedIn, passport.authenticate('local.signin', {
    successRedirect: './profile',
    failureRedirect: './loginFail',
    failureFlash: true,
}));

router.get('/profile', isLoggedIn, function (req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function (error, user) {
        if (user.dataValues.isAdmin) {
            return res.redirect('/admin/dashboard');
        }
        var curEmail = "", fullname = "", phonenumber = "", address = "";
        if (user) {
            if (user.dataValues.isAdmin) {
                return router.redirect('/admin/dashboard');
            }
            curEmail = user.dataValues.email;
            fullname = user.dataValues.fullname;
            phonenumber = user.dataValues.phonenumber;
            address = user.dataValues.address;
        }

        var cartID = Boolean(req.session.cartID) ? req.session.cartID : (-1);
        if (cartID != -1) {
            cartsController.getCartInformation(cartID, function (error, cart) {
                var cartQuantity = 0, cartPrice = 0;
                if (Boolean(error)) {
                    // Do nothing here
                }
                else {
                    cartQuantity = cart.dataValues.totalQuantiles;
                    cartPrice = cart.dataValues.totalPrice;
                }
                res.render('user/profile', {
                    title: 'Bán áo online',
                    csrfToken: req.csrfToken(),
                    email: curEmail,
                    fullname: fullname,
                    phonenumber: phonenumber,
                    address: address,
                    cartQuantity: cartQuantity,
                    cartPrice: cartPrice,
                });
            });
        }
        else {
            res.render('user/profile', {
                title: 'Bán áo online',
                csrfToken: req.csrfToken(),
                email: curEmail,
                fullname: fullname,
                phonenumber: phonenumber,
                address: address,
                cartQuantity: 0,
                cartPrice: 0,
            });
        }
    });
});

router.post('/editprofile', isLoggedIn, function(req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function(error, user) {
        if (!user) {
            return res.redirect('/');
        }

        var newName = req.body.edfullname;
        var newEmail = req.body.edemail;
        var newPassword = req.body.edpassword;
        var newPhoneNumber = req.body.edphonenumber;
        var newAddress = req.body.edaddress;
        if (newName || newEmail || newPassword || newPhoneNumber || newAddress) {
            var userInfo = {};
            if (newName) userInfo.fullname = newName;
            if (newEmail) userInfo.email = newEmail;
            if (newPassword) userInfo.password = newPassword;
            if (newPhoneNumber) userInfo.phonenumber = newPhoneNumber;
            if (newAddress) userInfo.address = newAddress;
            usersController.updateUserInformation(usrID, userInfo, function(error) {
                res.redirect('/user/profile');
            });
        }
        else {
            res.redirect('/user/profile');
        }
    });
});

router.get('/history', isLoggedIn, function (req, res, next) {
    var usrID = req.session.passport ? req.session.passport.user : (-1);
    usersController.findUserById(usrID, function (error, user) {
        if (user.dataValues.isAdmin) {
            return res.redirect('/admin/dashboard');
        }
        var curEmail = user.dataValues.email;
        ordersController.getOrdersDetailInformationByUser(usrID, function (error, carts) {
            if (error || !carts) 
                return res.status(400).send({message: "Cannot get detail information of orders"});

            var extractedOrders = extractListOfOrders.extractListOfOrders(carts);
            var cartQuantity = 0;
            var cartPrice = 0;

            var cartID = (req.session.cartID) ? (req.session.cartID) : (-1);
            if (cartID == -1) {
                res.render('user/history', {
                    title: 'Bán áo online',
                    email: curEmail,
                    carts: extractedOrders,
                    cartQuantity: 0,
                    cartPrice: 0,
                });
            }
            else {
                cartsController.findCartByID(cartID, function(error, cart) {
                    if (cart) {
                        cartQuantity = cart.dataValues.totalQuantiles;
                        cartPrice = cart.dataValues.totalPrice;
                    }
                    res.render('user/history', {
                        title: 'Bán áo online',
                        email: curEmail,
                        carts: extractedOrders,
                        cartQuantity: cartQuantity,
                        cartPrice: cartPrice,
                    });
                });
            }
        });
    });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
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
