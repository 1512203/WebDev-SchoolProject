function getStatus(statusInteger) {
    if (statusInteger == 1)
        return { status: "ĐANG CHỜ", isPending: true};
    if (statusInteger == 2)
        return { status: "ĐÃ GIAO HÀNG", isDelivered: true};
    return { status: "ĐÃ HỦY"};
}

module.exports = {
    extractListOfAllOrders(orders) {
        console.log("HERE");
        let carts = [];
        let totalMoney = 0;
        let totalQuantity = 0;
        for (let i = 0; i < orders.length; ++i) {
            let i_order = orders[i].dataValues;
            let cart = {
                ownerCartName: i_order.name,
                customerAddress: i_order.address,
                checkoutTime: i_order.createdAt,
            };

            let i_orderUser = i_order.User.dataValues;
            let i_orderCart = i_order.Cart.dataValues;

            cart.customerEmail = i_orderUser.email;
            cart.customerName = i_orderUser.fullname;
            cart.totalPrice = i_orderCart.totalPrice;
            cart.totalQuantity = i_orderCart.totalQuantiles;
            cart.orderID = i_order.id;
            cart.statusobj = getStatus(i_order.orderStatus);
            cart.statusnumber = i_order.orderStatus;

            totalMoney += cart.totalPrice;
            totalQuantity += cart.totalQuantity;
            carts.push(cart);
        }
        let result = {
            carts: carts,
            totalMoney: totalMoney,
            totalQuantity: totalQuantity,
        };
        return result;
    }
}
