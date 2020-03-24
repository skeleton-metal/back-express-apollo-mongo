const mongoose = require('mongoose'); 
const softDelete = require('mongoose-softdelete')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({ 

 name: {type: String, required: true}


});

GroupSchema.plugin(softDelete);
GroupSchema.plugin(mongoosePaginate);

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;