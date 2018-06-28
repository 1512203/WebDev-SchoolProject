function extractDateBetter(uglyDate) {
    let strUglyDate = uglyDate.toString();
    return strUglyDate.substring(4, 15);
}

module.exports = {
    extractSumList(groupedOrders) {
        for (let i = 0; i < groupedOrders.length; ++i) 
            groupedOrders[i].date = extractDateBetter(groupedOrders[i].date);
        return groupedOrders;
    }
}
