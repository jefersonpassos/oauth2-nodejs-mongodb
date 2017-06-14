var express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');
var getPhones = require('./controllers/phones.get');
var postPhones = require('./controllers/phones.post');
var putPhones = require('./controllers/phones.put');
var deletePhones = require('./controllers/phones.delete');
var getIdPhones = require('./controllers/phones.get.id');
var postUser = require('./controllers/user.post');
var getUser = require('./controllers/user.get');
var postClient = require('./controllers/client.post');
var getClient = require('./controllers/client.get');
var passport = require('passport');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/phoneslocker');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));


var port = process.env.PORT || 8081;
var router = express.Router();


app.use('/api', router);

var phonesRoute = router.route('/phones');

phonesRoute.get(authController.isAuthenticated, getPhones);
phonesRoute.post(authController.isBearerAuthenticated, postPhones);

//query for a specific number
var phoneIdRoute = router.route('/phones/:phoneId');

phoneIdRoute.put(authController.isBearerAuthenticated, putPhones);
phoneIdRoute.delete(authController.isBearerAuthenticated, deletePhones);
phoneIdRoute.get(authController.isBearerAuthenticated, getIdPhones);

var userRoute = router.route('/user');

userRoute.post(authController.isAuthenticated, postUser);
userRoute.get(authController.isAuthenticated, getUser);

var clientRoute = router.route('/client');

clientRoute.post(authController.isAuthenticated, postClient);
clientRoute.get(authController.isAuthenticated, getClient);

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


app.listen(port);

console.log('Server iniciado na porta ' + port); 