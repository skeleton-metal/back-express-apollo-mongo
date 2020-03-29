
const {createCustomization, findCustomization} = require('./CustomizationService');


export const initCustomization= function () {

    findCustomization().then(doc => {
        console.log("doc: ", doc)
        if(!doc){
            createCustomization({},{
                primary: '#000000',
                onPrimary: '#FFFFFF',
                secondary:'#000000',
                onSecondary: '#FFFFFF',
                logo: '',
                language: 'es'
            }).then(docNew => {
                console.log("docNew: ", docNew)
                process.exit()
            })
        }
    })

}
