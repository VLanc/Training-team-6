let fs = require('fs');
const clientSession = require("client-sessions");
let restify = require('restify');
let mailOptions, nodemailer, transporter;
// var mysql = require('mysql');
nodemailer = require('nodemailer');
transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hrappmifort2018@gmail.com',
    pass: 'cegthpfobnf'
  }
});
let server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
// server.use(server.sessions());
server.use(clientSession({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.requestLogger());
server.get('/login', login);
server.get('/reset', reset_password);

let port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);

function login(req, res, next) {
  res.header('X-Frame-Options', 'ALLOWALL');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  var email = req.query.email;
  console.log(email);
  var user = foundUser(email);
  res.send(user);
  next();

}

function reset_password(req, res, next) {
  res.header('X-Frame-Options', 'ALLOWALL');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  var email = req.query.email;
  var user = foundUser(email);
  if (user !== undefined) {
    mailOptions = {
      from: 'HRAPP <feronodemailer@gmail.com>',
      to: email,
      subject: 'HRAPP password reset',
      html: '<b>Your password:</b>' + user.password +''
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        return console.log(err);
      }
      return console.log("Message sent: " + info.response);
    });
    res.send("true");
    next();
  } else {
    res.send("false");
    next();
  }
}

function foundUser(email) {
  var users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  var user;
  users.forEach(function (val) {
    if (email == val.email) {
      user = val;
    }
  });
  return user;
}
