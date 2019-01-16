/**
 * @swagger
 * definitions:
 *   List:
 *     properties:
 *       ordername:
 *         type: string
 *       date:
 *         type: date
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
 *   lineList:
 *     properties:
 *       uom:
 *         type: string
 *       cost:
 *         type: integer
 *       unit:
 *         type: integer
 *       desc:
 *         type: string
 *       productid:
 *         type: string
 */

const express = require('express');
const app = express();
const userRoutes = express.Router();
config = require('../config/DB');
let User = require('../models/userList');
let LineItems=require('../models/lineitems')
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());   



/**
 * @swagger
 * /userlist/list:
 *   get:
 *     tags:
 *       - List
 *     description: Returns of all purchase order
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of all the purchase order 
 *         schema:
 *           $ref: '#/definitions/List'
 */
userRoutes.route('/list').get(function (req, res) {
  User.find(function (err, userlists){
    if(err){
      console.log(err);
    }
    else {
      res.json(userlists);
    }
  });
});

/**
 * @swagger
 * /userlist/linelist:
 *   get:
 *     tags:
 *       - lineList
 *     description: Returns of the line items 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of all the line items 
 *         schema:
 *           $ref: '#/definitions/lineList'
 */
userRoutes.route('/linelist').get(function (req, res) {
  LineItems.find(function (err, lineitems){
    if(err){
      console.log(err);
    }
    else {
      res.json(lineitems);
    }
  });
});

/**
 * @swagger
 * /userlist/edit:
 *   put:
 *     tags:
 *       - List
 *     description: Updates the unit
 *     produces: application/json
 *     parameters:
 *       name: List
 *       in: body
 *       description: Fields for edit 
 *       schema:
 *         type: array
 *         $ref: '#/definitions/List'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

userRoutes.post('/edit', function(req, res, next) {
  User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/**
 * @swagger
 * /userlist/update:
 *   put:
 *     tags:
 *       - List
 *     description: Updates a single Line record
 *     produces: application/json
 *     parameters:
 *       name: list
 *       in: body
 *       description: Fields for the list resource
 *       schema:
 *         type: Object
 *         $ref: '#/definitions/List'
 *     responses:
 *       200:
 *         description: Successfully updated
 */


userRoutes.post('/update', function(req, res, next) {
  User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, post) {
    if (err) return next(err);	
    else res.send(true);
  });
});


/**
 * @swagger
 * /userlist/delete:
 *   delete:
 *     tags:
 *       - lineList
 *     description: Deletes a single line item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: lineItem id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

userRoutes.post('/delete', function(req, res, next) {
  User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, post) {
	  if (err) return next(err);
    else res.send(true);
  });
});


module.exports = userRoutes;