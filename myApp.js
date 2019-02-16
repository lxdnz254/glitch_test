var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use('/',  (req, res, next) =>{
  console.log(req.method+ " "+req.path+" - "+req.ip)
  next()
})

// --> 11)  Mount the body-parser middleware  here
app.use('/name', bodyParser.urlencoded({extended: false}))

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server 
app.get('/', (req,res) => {
  res.send("Hello Express");
})
*/

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 3) Serve an HTML file */
app.get('/', (req,res) => {
  var path = __dirname + '/views/index.html';
  res.sendFile(path);
})

/** 4) Serve static assets  */
app.use(express.static(__dirname+'/public'));

/** 5) serve JSON on a specific route */
app.get('/json', (req,res) => {
  var msg = {"message": "Hello json"}
  
/** 6) Use the .env file to configure the app */
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    msg.message = msg.message.toUpperCase()
  }
  res.json(msg)
}) 


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next)=>{
  req.time = new Date().toString()
  next()
}, (req, res)=>{
  res.send({"time": req.time})
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res)=>{
  var echo = {"echo": req.params.word}
  res.send(echo)
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get((req,res)=>{
    var name={"name": req.query.first + " " + req.query.last}
    res.send(name)
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
.post((req,res)=>{
  var name={"name":req.body.first + " " + req.body.last}
  res.send(name)
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
