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



    // Login event
    $('#qhuy-login-btn').on('click', function() {
        $.get('/user/login', function(data, status) {
            $('#qhuy-login-form form input.csrfToken').val(data.csrfToken);
            if (data.hasErrors > 0) {
                let errorMess = '';
                for (let i = 0; i < data.messages.length; ++i) {
                    errorMess += "<p class=\"errorMess\">" + data.messages[i] + "</p>";
                }
                $('#qhuy-login-form div.alert').text(errorMess);
                $('#qhuy-login-form div.alert').css('display', 'block');
            }
            else {
                $('#qhuy-login-form div.alert').css('display', 'none');
            }
        });
        $('#qhuy-login-form').css('display', 'block');
    });

    $('#qhuy-login-form .qhuy-close').on('click', function() {
        $('#qhuy-login-form').css('display', 'none');
    });

    $('#qhuy-login-form .qhuy-cancelBtn').on('click', function() {
        $('#qhuy-login-form form')[0].reset();
        $('#qhuy-login-form').css('display', 'none');
    });




    // Signup event
    $('#qhuy-signup-btn').on('click', function() {
        $.get('/user/signup', function(data, status) {
            $('#qhuy-signup-form form input.csrfToken').val(data.csrfToken);
            if (data.hasErrors > 0) {
                let errorMess = '';
                for (let i = 0; i < data.messages.length; ++i) {
                    errorMess += "<p class=\"errorMess\">" + data.messages[i] + "</p>";
                }
                $('#qhuy-signup-form div.alert').text(errorMess);
                $('#qhuy-signup-form div.alert').css('display', 'block');
            }
            else {
                $('#qhuy-signup-form div.alert').css('display', 'none');
            }
        });
        $('#qhuy-signup-form').css('display', 'block');
    });

    $('#qhuy-signup-form .qhuy-close').on('click', function() {
        $('#qhuy-signup-form').css('display', 'none');
    });

    $('#qhuy-signup-form .qhuy-cancelBtn').on('click', function() {
        $('#qhuy-signup-form form')[0].reset();
        $('#qhuy-signup-form').css('display', 'none');
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

    $('.qhuy-see-detail .qhuy-close').on('click', function() {
        $('.qhuy-see-detail').css('display', 'none');
    });

});
