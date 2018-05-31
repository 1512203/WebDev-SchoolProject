module.exports = {
    extractListOfStyleNames(stylesFromSequelize) {
        let styleNames = [];
        for (let i = 0; i < stylesFromSequelize.length; ++i) {
            styleNames.push({
                name: stylesFromSequelize[i].dataValues.styleName,
                id: stylesFromSequelize[i].dataValues.id,
            });
        }
        return styleNames;
    }
}
