const {createCustomization, findCustomization} = require('./CustomizationService');
const defaults = require('./../defaults')

export const initCustomization = function () {

    findCustomization().then(doc => {
        console.log("doc: ", doc)
        if (!doc) {
            createCustomization({}, defaults).then(docNew => {
                console.log("docNew: ", docNew)
                process.exit()
            })
        }
    })

}
