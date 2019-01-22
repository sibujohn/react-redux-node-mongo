const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var CustomerSchema = new Schema({      
    customerId: String, 	
    customerName: String
}); 


module.exports = mongoose.model('customer', CustomerSchema, 'customer');