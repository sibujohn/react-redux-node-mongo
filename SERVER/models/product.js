const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductSchema = new Schema({      
    uom : String,
    cost : Number,
    unit : Number,
    desc : String,
    productId : String,
	productName : String
}); 

module.exports = mongoose.model('product', ProductSchema, 'product');