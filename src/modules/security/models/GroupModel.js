const mongoose = require('mongoose'); 
const softDelete = require('mongoose-softdelete')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({ 

 name: {
  type: String,
  required: true,
  validate: {
   validator: function (value) {
    let r = /^[A-Za-z\s]+$/;
    return r.test(value);
   },
   message: "Solo se admiten letras, sin espacios"
  }},
 users: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false
 }]

});

GroupSchema.plugin(softDelete);
GroupSchema.plugin(mongoosePaginate);

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
