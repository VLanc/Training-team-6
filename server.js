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

let port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);




