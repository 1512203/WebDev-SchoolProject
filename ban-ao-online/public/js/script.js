$(document).ready(function() {
    // Set Options 
    var speed = 500;        // fade speed
    var autoswitch = true;  // auto slider options
    var autoswitch_speed = 4000;    // auto slider speed

    // Switch to next slide 
    var switchToNextSlide = function () {
        $('.active').removeClass('active').addClass('oldActive');
        if ($('.oldActive').is(':last-child')) {
            $('.qhuy-slide').first().addClass('active');
        }
        else {
            $('.oldActive').next().addClass('active');
        }
        $('.oldActive').removeClass('oldActive');
        $('.qhuy-slide').fadeOut(speed);
        $('.active').fadeIn(speed);
    };

    // Switch to previous slide
    var switchToPrevSlide = function () {
        $('.active').removeClass('active').addClass('oldActive');
        if ($('.oldActive').is(':first-child')) {
            $('.qhuy-slide').last().addClass('active');
        }
        else {
            $('.oldActive').prev().addClass('active');
        }
        $('.oldActive').removeClass('oldActive');
        $('.qhuy-slide').fadeOut(speed);
        $('.active').fadeIn(speed);
    };

    // Add initial active class 
    $('.qhuy-slide').first().addClass('active');

    // Hide all slides 
    $('.qhuy-slide').hide();

    // Show first slide
    $('.active').show();

    // Next handler
    $('#next').on('click', switchToNextSlide);

    // Previous handler
    $('#prev').on('click', switchToPrevSlide);

    // Auto slider handler
    if (autoswitch == true) {
        setInterval(switchToNextSlide, autoswitch_speed);
    }

    // Login button event
    $('#qhuy-login-btn').on('click', function() {
        $('#qhuy-login-form').css('display', 'block');
    });

    $('#qhuy-signup-btn').on('click', function() {
        $('#qhuy-signup-form').css('display', 'block');
    });

    $('#qhuy-login-form .qhuy-close').on('click', function() {
        $('#qhuy-login-form').css('display', 'none');
    });

    $('#qhuy-signup-form .qhuy-close').on('click', function() {
        $('#qhuy-signup-form').css('display', 'none');
    });

    $('.qhuy-see-detail .qhuy-close').on('click', function() {
        $('.qhuy-see-detail').css('display', 'none');
    });

    $('#qhuy-login-form .qhuy-cancelBtn').on('click', function() {
        $('#qhuy-login-form form')[0].reset();
        $('#qhuy-login-form').css('display', 'none');
    });

    $('#qhuy-signup-form .qhuy-cancelBtn').on('click', function() {
        $('#qhuy-signup-form form')[0].reset();
        $('#qhuy-signup-form').css('display', 'none');
    });

    $('#qhuy-login-form button[type=submit]').click(function() {
        var usrname = $('#qhuy-login-form input[name=usrname]').val();
        var pasword = $('#qhuy-login-form input[name=psw]').val()
        // Some dummy code
        if (usrname == "ngquochuy123") {
            if (pasword == "123456") {
                /*$('header nav.qhuy-account-option').css('display', 'none');
                $('header div.qhuy-account-option ul li a').text('Chào Admin, ' + usrname);
                $('header div.qhuy-account-option').css('display', 'block');
                $('#qhuy-login-form').css('display', 'none');
                $('.qhuy-user').css('display', 'none');
                $('.qhuy-admin').css('display', 'block');*/
                document.location.href="admin/thongke.html"
            }
            else {
                alert("Wrong password");
            }
        }
        else {
           // $('header nav.qhuy-account-option').css('display', 'none');
           // $('header div.qhuy-account-option ul li a').text('Chào ' + usrname);
           // $('header div.qhuy-account-option').css('display', 'block');
           // $('#qhuy-login-form').css('display', 'none');
           document.location.href="logged in/index.html"
        }
        $('#qhuy-login-form form').submit(function() {
            return false;
        });
    });

    // See product's detail
    $('.col-3').on('click', function() {
        var prodID = $(this).children('p.qhuy-productid-hidden').text();
        console.log(prodID);
        $.get('/product/'+prodID, function(data, status) {
            $('.qhuy-see-detail .qhuy-product-thumb img').attr('src', data.pathToImg);
            $('.qhuy-see-detail .qhuy-product-desp h1.title').text(data.productName);
            $('.qhuy-see-detail .qhuy-product-desp ul.list-unstyled li.qhuy-product-style-detail span').text(data.Style.styleName);
            $('.qhuy-see-detail .qhuy-product-desp ul.list-unstyled li.qhuy-product-status-detail span').text(data.availProducts);
            $('.qhuy-see-detail .qhuy-product-desp ul.list-unstyled li.qhuy-product-price-detail h2').text(data.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ");
            $('.qhuy-see-detail').css('display', 'block');
        });
    });

});
