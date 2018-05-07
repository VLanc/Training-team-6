let fs = require('fs');
const clientSession = require("client-sessions");
const corsMiddleware = require('restify-cors-middleware');
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
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);
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
server.get('/events', respond_events);
server.get('/vacancies', vacancies);
server.get('/candidates', candidates);
server.get('/positions', positions);
server.get('/getUsers', getUsers);
server.get('/id-candidates', idCandidates);

server.post('/saveCandidate', saveCandidate);
server.post('/saveVacancy', saveVacancy);
server.post('/saveUser', saveUser);
server.post('/register', register);
server.post('/saveEvent', saveEvent);

let port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);

function login(req, res, next) {
  let email = req.query.email;
  let user = foundUser(email);
  res.send(user);
  // console.log(res.send(user));
  // res.send(JSON.stringify(user));
  next();

}

function reset_password(req, res, next) {
  let email = req.query.email;
  let user = foundUser(email);
  if (user !== undefined) {
    mailOptions = {
      from: 'HRAPP <feronodemailer@gmail.com>',
      to: email,
      subject: 'HRAPP password reset',
      html: '<b>Your password:</b>' + user.password + ''
    };
    transporter.sendMail(mailOptions, function (err, info) {
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

function register(req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));
  if (foundUser(user.email)) {
    //res.send('false');
    next();
  } else {
    let newUser = {};
    let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    newUser.id = users.length + 1;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.role = "";
    newUser.roleIndex = "";
    newUser.name = "";
    newUser.surname = "";
    newUser.photo = "";
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send(newUser);
    next();
  }

}


function foundUser(email) {
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  let user;
  users.forEach(function (val) {
    if (email == val.email) {
      user = val;
    }
  });
  return user;
}


function respond_events(req, res, next) {
  let events = JSON.parse(fs.readFileSync('event.json', 'utf8'));
  res.send(events);
  next();
}

function saveEvent(req, res, next) {
  let event = JSON.parse(JSON.stringify(req.body));
  let newEvent = true;
  let events = JSON.parse(fs.readFileSync('event.json', 'utf8'));
  //events.push(event);
  let newEvents = events.map(function (val) {
    if (val.id == event.id) {
      val = event;
      newEvent = false;
      return val;
    }
    return val;
  });
  if (newEvent){
    newEvents.push(event);
  }
  fs.writeFileSync('event.json', JSON.stringify(newEvents));
  next();
}


function vacancies(req, res, next) {
  let obj = JSON.parse(fs.readFileSync('vacancies.json', 'utf8'));
  res.send(obj);
  next();
}

function saveVacancy(req, res, next) {
  let vacancy = JSON.parse(JSON.stringify(req.body));
  let vacancies = JSON.parse(fs.readFileSync('vacancies.json', 'utf8'));
  vacancies.push(vacancy);
  fs.writeFileSync('vacancies.json', JSON.stringify(vacancies));
  next();
}

function saveCandidate(req, res, next){
  let candidate = JSON.parse(JSON.stringify(req.body));
  let candidates = JSON.parse(fs.readFileSync('profile.json', 'utf8'));
  let newCandidates = candidates.map(function (val) {
    if (val.id == candidate.id) {
      val = candidate;
      return val;
    }
    return val;
  });
  fs.writeFileSync('profile.json', JSON.stringify(newCandidates));
  next();
}

function saveUser(req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  let newUsers = users.map(function (val) {
    if (val.id == user.id) {
      val = user;
      return val;
    }
    return val;
  });
  fs.writeFileSync('users.json', JSON.stringify(newUsers));
  next();
}

function candidates(req, res, next) {
  let candidates = JSON.parse(fs.readFileSync('profile.json', 'utf8'));
  res.send(candidates);
  next();
}

function positions(req, res, next) {
  let positions = JSON.parse(fs.readFileSync('positions.json', 'utf8'));
  res.send(positions);
  next();
}

function getUsers(req, res, next) {
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  res.send(users);
  next();
}

function idCandidates(req, res, next) {
  let candidate = {};
  let id = +req.query.id;
  let profiles = JSON.parse(fs.readFileSync('profile.json', 'utf8'));
  profiles.forEach(function (val) {
    if (val.id === id) {

      candidate = val;
    }
  });
  res.send(candidate);
  next();
}
