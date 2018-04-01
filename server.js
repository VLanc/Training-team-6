var fs = require('fs');
var restify = require('restify');
var mysql = require('mysql');

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
    var obj = JSON.parse(fs.readFileSync('views/profile.json', 'utf8'));
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

var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get(/(^\/$)|(\.(html|js|css|png|jpg)$)/, restify.plugins.serveStatic({
    directory: 'views',
    default: 'candidates.html'
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
    fs.readFile(__dirname+'/views/candidates.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        res.write(data);
        res.end();
        next();
    });
});
server.post('/id-candidate', req_idcand);
server.post('/interview', req_events);
server.post('/id-interview', req_idevents);
// server.listen(8080, '127.0.0.1', function () {
//     console.log('%s listening at %s', server.name, server.url);
// });
var port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);