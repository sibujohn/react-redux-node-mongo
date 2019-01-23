var config = require('./config');
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose')
var swaggerJSDoc = require('swagger-jsdoc');
const apiRoutes = require('./routes/api.route');
 
var viewpath = config.app.views;
	
mongoose.Promise = global.Promise;
mongoose.connect(config.app.DB).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
	
var swaggerDefinition = {
  info: {
    title: 'iBaset API',
    version: '1.0.0',
    description: 'RESTful APIs for iBaset',
  },
  host: 'localhost:3000',
  //basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./backend/routes/*.js'],
};
	 
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(function (req, res, next) {        
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
  res.setHeader('Access-Control-Allow-Credentials', true);       
  next();  
 });  
app.use(express.static(path.join(__dirname, '../build'))); 
app.use(express.static(path.join(__dirname, config.app.views)));

module.exports = app;