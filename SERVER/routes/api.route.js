/**
 * @swagger
 * definitions:
 *   Order:
 *     properties:
 *       ordernumber:
 *         type: integer
 *       customerId:
 *         type: string
 *       date:
 *         type: string
 *         format: date
 *       zip:
 *         type: string
 *       state:
 *         type: string
 *       createdBy:
 *         type: string
 *       picked:
 *         type: string
 *       shipped:
 *         type: string
 *       lineitems:
 *         type: object
 *         properties:
 *           uom:
 *             type: string
 *           cost:
 *             type: integer
 *           unit:
 *             type: integer
 *           desc:
 *             type: string
 *           productid:
 *             type: string
 */
 
 
 /**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       uom:
 *         type: string
 *       cost:
 *         type: integer
 *       unit:
 *         type: integer
 *       desc:
 *         type: string
 *       productId:
 *         type: string
 *       productName:
 *         type: string
 */
 
 /**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       customerId:
 *         type: string
 *       customerName:
 *         type: string
 */

const express = require('express');
const app = express();
const apiRoutes = express.Router();
config = require('../config/DB');
let Order = require('../models/order');
let Product = require('../models/product')
let Customer = require('../models/customer')
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     tags:
 *       - Product
 *     description: Returns the list of products 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: skip
 *         description: Pages to skip
 *         in: query
 *         required: false
 *         type: string
 *       - name: limit
 *         description: Page size
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Product list
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *             docs:
 *               type: array
 *               $ref: '#/definitions/Product'
 */
apiRoutes.route('/product/all').get(function (req, res) {
	
   	let skip = req.query.skip;
    let limit = req.query.limit;
	
	if (!skip){
		skip=0;
	}
	if (!limit){
		limit=20;
	}
	
	Product.find(function (err, products){
    if(err){
      console.log(err);
    }
	else {
		Product.count({}, function (err, count){
			if(err){
				console.log(err);
			}
			else{
				res.json({total:count,docs:products});
			}
		});
    }
  }).limit(parseInt(limit)).skip(parseInt(skip));
});

/**
 * @swagger
 * /api/product/byname/{name}:
 *   get:
 *     tags:
 *       - Product
 *     description: Get products by product name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Product name
 *         in: path
 *         required: true
 *         type: string
 *       - name: skip
 *         description: Pages to skip
 *         in: query
 *         required: false
 *         type: string
 *       - name: limit
 *         description: Page size
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Product list
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *             docs:
 *               type: array
 *               $ref: '#/definitions/Product'
 */
apiRoutes.route('/product/byname/:name').get(function (req, res) {

	let skip = req.query.skip;
    let limit = req.query.limit;
	
	if (!skip){
		skip=0;
	}
	if (!limit){
		limit=20;
	}

	Product.find({productName: new RegExp(req.params.name+'.*', 'i')}, function (err, products){
    if(err){
      console.log(err);
    }
    else {
		Product.count({productName: new RegExp(req.params.name+'.*', 'i')}, function (err, count){
			if(err){
				console.log(err);
			}
			else{
				res.json({total:count,docs:products});
			}
		});
    }
  }).limit(parseInt(limit)).skip(parseInt(skip));
});

/**
 * @swagger
 * /api/order/{ordernumber}:
 *   get:
 *     tags:
 *       - Order
 *     description: Get a single Order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ordernumber
 *         description: Order Number
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order 
 *         schema:
 *           $ref: '#/definitions/Order'
 */
apiRoutes.route('/order/:ordernumber').get(function (req, res) {
   Order.findOne({ordernumber:req.params.ordernumber}, function (err, order){
    if(err){
      console.log(err);
    }
    else {
      res.json(order);
    }
  });
});

/**
 * @swagger
 * /api/order/bycustomer/{customerid}:
 *   get:
 *     tags:
 *       - Order
 *     description: Get all orders of a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerid
 *         description: Customer Id
 *         in: path
 *         required: true
 *         type: string
 *       - name: skip
 *         description: Pages to skip
 *         in: query
 *         required: false
 *         type: string
 *       - name: limit
 *         description: Page size
 *         in: query
 *         required: false
 *         type: string
 *       - name: sortby
 *         description: Attribute for sorting
 *         in: query
 *         required: false
 *         type: string
 *       - name: sorthow
 *         description: asc or desc
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Order 
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *             docs:
 *               type: array
 *               $ref: '#/definitions/Order'
 */
apiRoutes.route('/order/bycustomer/:customerid').get(function (req, res) {

	let skip = req.query.skip;
    let limit = req.query.limit;
	let sortby = req.query.sortby;
	let sorthow = req.query.sorthow;
	if (!skip){
		skip=0;
	}
	if (!limit){
		limit=20;
	}
	let sortString = 'ordernumber';
	if(sortby){
		sortString = sortby +' '+sortString;
	}
	if(sorthow=="desc"){
		sortString = '-'+sortString;
	}

	Order.find({customerId:req.params.customerid}, function (err, orders){
    if(err){
		console.log(err);
    }
    else {
		Order.count({customerId:req.params.customerid}, function (err, count){
			if(err){
				console.log(err);
			}
			else{
				res.json({total:count,docs:orders});
			}
		});
    }
  }).limit(parseInt(limit)).skip(parseInt(skip)).sort(sortString);
});

/**
 * @swagger
 * /api/order:
 *   put:
 *     tags:
 *       - Order
 *     description: Update Order
 *     produces: application/json
 *     parameters:
 *       name: Order
 *       in: body
 *       description: Order Json object 
 *       schema:
 *         type: object
 *         $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Updated Order
 *         schema:
 *           $ref: '#/definitions/Order'
 */

apiRoutes.put('/order', function(req, res, next) {
  Order.findOneAndUpdate({ordernumber:req.body.ordernumber}, req.body, function (err, order) {
	  if (err) 
		  return next(err);
	  else
		res.json(order);
  });
});

/**
 * @swagger
 * /api/order:
 *   post:
 *     tags:
 *       - Order
 *     description: Create Order
 *     produces: application/json
 *     parameters:
 *       name: Order
 *       in: body
 *       description: Fields for the Order
 *       schema:
 *         type: Object
 *         $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Created Order
 *         schema:
 *           $ref: '#/definitions/Order'
 */

apiRoutes.post('/order', function(req, res, next) {
	var newOrderObj = new Order(req.body);
	newOrderObj.save(function (err) {
    if (err) 
		return next(err);
    else 
		res.send(newOrderObj);
  });
});


/**
 * @swagger
 * /api/order/{ordernumber}:
 *   delete:
 *     tags:
 *       - Order
 *     description: Deletes a single Order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ordernumber
 *         description: Order Number
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

apiRoutes.delete('/order/:ordernumber', function(req, res, next) {

  Order.findOneAndRemove({ordernumber:req.params.ordernumber}, function (err, deleted) {
	  if (err) 
		  return next(err);
	  else 
		  res.send("Successfully deleted");
  });
});

/**
 * @swagger
 * /api/customer/search/{name}:
 *   get:
 *     tags:
 *       - Customer
 *     description: Search customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Customer name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of customers 
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Customer'
 */
apiRoutes.route('/customer/search/:name').get(function (req, res) {

   Customer.find({customerName: new RegExp(req.params.name+'.*', 'i') }, function (err, customers){
    if(err){
      console.log(err);
    }
    else {
      res.json(customers);
    }
  });
});

module.exports = apiRoutes;