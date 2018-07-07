const path = require('path');

// express
var express = require('express');
var app = express();

// bodyparser - to redirect user information
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// static routes
app.use(express.static(path.join(__dirname, './static')));

// server
var port = 5000;
const server = app.listen(port)

// session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

// install socket
const io = require('socket.io')(server);

io.on('connection', function (socket){
    console.log("user conneceted"); //Prints user connected in the terminal
    socket.on('userData', function (userInfo){
        userInfo.randomNum  = Math.floor((Math.random() * 1000) + 1);
    socket.emit('infoUser', userInfo);
    console.log(userInfo); //prints the user information to the terminal
    });

})
// create the routing
app.get('/', function (req, res){
    res.render('index');
})


