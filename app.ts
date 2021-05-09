var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
const mongoose3 = require('mongoose');
var bodyParser = require('body-parser');
// mongoose3.connect('mongodb+srv://imran8811:K%21ller%21%40%23@pkapparel.6x7jk.mongodb.net/pkapparel?retryWrites=true&w=majority&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose3.connect('mongodb://imran8811:K%21ller%21%40%23@pkapparel-shard-00-00.6x7jk.mongodb.net:27017,pkapparel-shard-00-01.6x7jk.mongodb.net:27017,pkapparel-shard-00-02.6x7jk.mongodb.net:27017/pkapparel?ssl=true&replicaSet=atlas-jmz7e0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose3.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes.ts');
var usersRouter = require('./routes/users.routes.ts');
// var loginRouter = require('./routes/login.routes.ts');
// var signupRouter = require('./routes/signup.routes.ts');
var productRouter = require('./routes/product.routes.ts');
var cartRouter = require('./routes/cart.routes.ts');

var app = express();

app.use(cors());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/signup', signupRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000)

module.exports = app;
