var stripe = Stripe('pk_test_lVC0k9hhLyE3psc92zmyN0m2');
var elements = stripe.elements();

var style = {
    base: {
        fontSize: '16px',
        color: "#32325d",
    },
};

var card = elements.create('card', {style: style});
card.mount("#card-element");

var form = $('#qhuy-checkout-form form');

form.submit(function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
        if (result.error) {
        }
        else {
            stripeTokenHandler(result.token);
        }
    });
});

function stripeTokenHandler(token) {
    var formInputs = $('#qhuy-checkout-form form .qhuy-has-input');
    formInputs.append("<input type=\"hidden\" name=\"stripeToken\" value=\"" + token.id + "\">");
}
