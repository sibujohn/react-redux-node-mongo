const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var lineItem=new Schema({
	uom : String,
	cost : Number,
    unit : Number,
    desc : String,
    productId : String
})
var orderSchema = new Schema({      
    ordernumber : Number,
	customerId : String,
    date : Date,	
    zip : String,
    state : String,
    createdBy : String,
    picked : String,
    shipped : String,
	lineItems:[lineItem]
}); 

module.exports = mongoose.model('order', orderSchema, 'order');