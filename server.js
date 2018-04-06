var fs = require('fs');
const clientSession = require("client-sessions");
var restify = require('restify');
var mailOptions, nodemailer, transporter;
// var mysql = require('mysql');
nodemailer = require('nodemailer');
transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hrappmifort2018@gmail.com',
        pass: 'cegthpfobnf'
    }
});
var server = restify.createServer();
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


server.get(/(^\/$)|(\.(html|js|css|png|jpg)$)/, restify.plugins.serveStatic({
    directory: 'views',
    default: 'register-login-reset.html'
}));


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'hrappdb'
// });
//
// connection.connect();
// connection.query('SELECT * from users', function(err, rows, fields) {
//     if (err) throw err;
//     //console.log(rows[0].name);
// });

server.get('/id-candidate', respon_cand);
server.get('/vacancies-grid', respond_grid);
server.get('/newcand', respond_newcand);
server.get('/interview', respond_events);
server.get('/id-interview', respond_interview);
// server.get('/', function (req, res, next) {
//     res.send("zdarova");
//     return next();
// });
server.get('/index', function (req, res, next) {
    fs.readFile(__dirname + '/views/candidates.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        res.write(data);
        res.end();
        next();

    });
    console.log('1');
});
server.get('/user-cabinet', req_user_cabinet);

server.post('/id-candidate', req_idcand);
server.post('/interview', req_events);
server.post('/id-interview', req_idevents);
// server.post('/login', login);
server.post('/login', login);
server.get('/userdata', userdata);
server.post('/reset', reset_password);
server.get('/check', function (req, res, next) {
    if (req.session.username) {
        res.set('Content-Type', 'text/html');
        res.send('<h2>User ' + req.session.username + ' is logged in! </h2>')
    } else {
        res.send('not logged in');
    }
    return next();
});
server.post('/register', register);
server.get('/logout', logout);
// server.listen(8080, '127.0.0.1', function () {
//     console.log('%s listening at %s', server.name, server.url);
// });
var port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);


function respon_cand(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var candidate = {};
    var id = req.query.id;
    var profiles = JSON.parse(fs.readFileSync('views/profile.json', 'utf8'));
    profiles.forEach(function (val) {
        if (val.id === id) {

            candidate = val;
        }
    });
    res.send(candidate);
    next();
}

function respond_interview(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var event = {};
    var id = req.query.id.split('=')[1];
    var events = JSON.parse(fs.readFileSync('views/event.json', 'utf8'));
    events.forEach(function (val) {
        if (val.id == id) {
            event = val;
        }
    });
    res.send(event);
    next();
}

function respond_events(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var events = JSON.parse(fs.readFileSync('views/event.json', 'utf8'));
    res.send(events);
    next();
}

function respond_grid(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var obj = JSON.parse(fs.readFileSync('views/vacancies.json', 'utf8'));
    res.send(obj);
    next();
}

function respond_newcand(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var obj = JSON.parse(fs.readFileSync('views/profile.json', 'utf8'));
    res.send(obj);
    next();
}

function req_idcand(req, res, next) {
    var candidate = JSON.parse(JSON.stringify(req.body));
    var profiles = JSON.parse(fs.readFileSync('views/profile.json', 'utf8'));
    var newProfiles = profiles.map(function (val) {
        if (val.id === candidate.id) {
            val = candidate;
            return val;
        }
        return val;
    });
    fs.writeFileSync('views/profile.json', JSON.stringify(newProfiles));
    next();
}

function req_events(req, res, next) {
    var event = JSON.parse(JSON.stringify(req.body));
    var events = JSON.parse(fs.readFileSync('views/event.json', 'utf8'));
    event.id = events.length + 1;
    events.push(event);
    fs.writeFileSync('views/event.json', JSON.stringify(events));
    next();
}

function req_idevents(req, res, next) {
    var event = JSON.parse(JSON.stringify(req.body));
    var events = JSON.parse(fs.readFileSync('views/event.json', 'utf8'));
    var newEvents = events.map(function (val) {
        if (val.id == event.id) {
            val = event;
            return val;
        }
        return val;
    });
    fs.writeFileSync('views/event.json', JSON.stringify(newEvents));
    next();
}

function login(req, res, next) {

    var users = JSON.parse(fs.readFileSync('views/users.json', 'utf8'));
    var foundUser;
    users.forEach(function (val) {
        if (val.email == req.body.email && val.password == req.body.password) {
            foundUser = val;
        }
    });

    if (foundUser !== undefined) {
        req.session.email = foundUser.email;
        res.send(req.session.email);
        console.log("Login succeeded: ", foundUser.email);
        next();
    } else {
        // req.session.reset();
        //res.send(req.session);
        console.log("Login failed: ", req.body.email);
        next();
    }
}


function logout(req, res) {
    req.session.reset();
    res.send(req.session);
}

function register(req, res, next) {
    var user ={};
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = "";
    user.name = "";
    user.surname = "";
    user.photo = "";
    console.log(user);
    var users = JSON.parse(fs.readFileSync('views/users.json', 'utf8'));
    users.push(user);
    fs.writeFileSync('views/users.json', JSON.stringify(users));
    var foundUser = user;
    if (foundUser !== undefined) {
        req.session.email = foundUser.email;
        res.send(req.session.email);
        console.log("Login succeeded: ", foundUser.email);
        next();
    } else {
        // req.session.reset();
        //res.send(req.session);
        console.log("Login failed: ", foundUser.email);
        next();
    }
}

function req_user_cabinet(req, res, next) {
    if (req.session.email) {
        if (req.session.email == "log") {
            res.send(200, 'false');
        } else {
            res.send(req.session);
        }
        //var session = JSON.parse(req.session);
        //console.log(req.session);

    } else {
        res.send(200, 'false');
    }

    return next();
}

function userdata(req, res, next) {
    var email = req.query.email;
    var users = JSON.parse(fs.readFileSync('views/users.json', 'utf8'));
    var user = {};
     users.map(function (val) {
        if (val.email == email) {
            user = val;
        }
    });
    res.send(user);
    next();
}

function reset_password(req, res, next) {
    var email = req.body.email;
    console.log(email);
    var users = JSON.parse(fs.readFileSync('views/users.json', 'utf8'));
    var password;
    users.forEach(function (val) {
       if (email == val.email) {
           password = val.password;
       }
    });
    console.log(password);
    mailOptions = {
        from: 'HRAPP <feronodemailer@gmail.com>',
        to: email,
        subject: 'HRAPP password reset',
        html: '<b>Your password:</b>' + password +''
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            return console.log(err);
        }
        return console.log("Message sent: " + info.response);
    });
        next();
}