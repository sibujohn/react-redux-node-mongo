const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var LineSchema = new Schema({      
    uom: String, 	
    cost: Number,      
    unit:  Number ,       
    desc:  String ,
    productid:  String       
});

module.exports = mongoose.model('LineItems', LineSchema);