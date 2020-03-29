const mongoose = require('mongoose'); 
const softDelete = require('mongoose-softdelete')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const CustomizationSchema = new Schema({ 

 primary: {type: String, required: true},
 onPrimary: {type: String, required: true},
 secondary: {type: String, required: true},
 onSecondary: {type: String, required: true},
 logo: {type: String, required: true},
 language: {type: String, required: true}


});

CustomizationSchema.plugin(softDelete);
CustomizationSchema.plugin(mongoosePaginate);

const Customization = mongoose.model('Customization', CustomizationSchema);

module.exports = Customization;