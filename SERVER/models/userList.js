const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var lineItem=new Schema({uom: String, cost: Number,      
    unit:  Number ,       
    desc:  String ,
    productid:  String })
var iBasetSchema = new Schema({      
    ordernumber: String, 
    date:String,	
    zip:  String ,      
    state:  String ,       
    createdBy:  String ,
    picked:  String ,
    shipped:  String ,
	lineItems:[lineItem]
});

module.exports = mongoose.model('UserList', iBasetSchema);



