module.exports = {
    extractListOfProducts(productsList) {
        let products = [];
        for (let i = 0; i < productsList.length; ++i) {
            let i_product = productsList[i].dataValues;
            let product = {
                productID: i_product.id,
                productName: i_product.productName,
                productPrice: i_product.productPrice,
                productDescription: i_product.productDescription,
                productStyle: i_product.Style.dataValues.styleName,
                pathToImg: i_product.pathToImg,
            };
            products.push(product);
        }
        return products;
    }
}
