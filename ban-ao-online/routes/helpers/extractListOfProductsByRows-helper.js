module.exports = {
    extractListOfProductsByRows(productsFromSequelize) {
        let productList = [];
        let nProductsInARow = 4;
        for (let i = 0, k = 0; i < productsFromSequelize.length; i += nProductsInARow, k += 1) {
            productList.push([]);
            console.log(productList, k);
            for (let j = 0; i+j < productsFromSequelize.length && j < nProductsInARow; ++j) {
                productList[k].push({
                    productID: productsFromSequelize[i+j].dataValues.id,
                    productName: productsFromSequelize[i+j].dataValues.productName,
                    productPrice: productsFromSequelize[i+j].dataValues.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    productImage: productsFromSequelize[i+j].dataValues.pathToImg,
                    isRootItem: (i+j == 0),
                    productStyleID: productsFromSequelize[i+j].dataValues.productStyleID,
                });
            }
            console.log(productList[k]);
        }
        return productList;
    }
}
