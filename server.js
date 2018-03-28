var fs = require('fs');
var restify = require('restify');


function respon_cand(req, res, next) {

    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var candidate = {
        id: "",
        date: "",
        position: "",
        name: "",
        address: "",
        city: "",
        mobileNumber: "",
        email: "",
        salary: "",
        photo: "",
        skills: "",
        description: [],
        info: [],
        education: []

    };
    var id = req.query.id;


    var profiles = JSON.parse(fs.readFileSync('profile.json', 'utf8'));

    profiles.forEach(function (val) {

        if (val.id === id) {

            candidate.id = val.id;//TODO: as fields names in the json and candidate template are the same better to go over object keys and fill with json data - Object.keys(obj).forEach(function(prop){console.log(prop)})
            candidate.position = val.position;
            candidate.date = val.date;
            candidate.name = val.name;
            candidate.salary = val.salary;
            candidate.address = val.address;
            candidate.city = val.city;
            candidate.mobileNumber = val.mobileNumber;
            candidate.email = val.email;
            candidate.salary = val.salary;
            candidate.photo = val.photo;
            candidate.skills = val.skills;

            for (var i = 0; i < val.info.length; i++) {


                candidate.info.push(val.info[i]);

            }


            for (var i = 0; i < val.education.length; i++) {
                candidate.education.push(val.education[i]);

            }

            for (var i = 0; i < val.description.length; i++) {
                candidate.description.push(val.description[i]);
            }


        }

    });

    res.send(candidate);

    next();
}

function respond_events(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var events = JSON.parse(fs.readFileSync('fc/event.json', 'utf8'));

    res.send(events);
    next();
}

function respond_grid(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


    var obj = JSON.parse(fs.readFileSync('profile.json', 'utf8'));

    res.send(obj);
    next();
}

function respond_newcand(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var obj = JSON.parse(fs.readFileSync('profile.json', 'utf8'));

    res.send(obj);
    next();

}

function req_idcand(req, res, next) {

    var candidate = JSON.parse(JSON.stringify(req.body));
    var profiles = JSON.parse(fs.readFileSync('profile.json', 'utf8'));


    profiles.forEach(function (val) {

        if (val.id === candidate.id) {


            val.position = candidate.position;//TODO: as fields names in the json and candidate template are the same better to go over object keys and fill with json data - Object.keys(obj).forEach(function(prop){console.log(prop)})
            val.name = candidate.name;
            val.salary = candidate.salary;
            val.address = candidate.address;
            val.city = candidate.city;
            val.mobileNumber = candidate.mobileNumber;
            val.email = candidate.email;
            val.salary = candidate.salary;
            val.photo = candidate.photo;
            val.skills = candidate.skills;
            val.description = candidate.description;


            val.info = [];
            for (var i = 0; i < candidate.info.length; i++) {

                val.info.push(candidate.info[i]);


            }

            val.education = [];
            for (var i = 0; i < candidate.education.length; i++) {


                val.education.push(candidate.education[i]);

            }
            val.description = [];
            for (var i = 0; i < candidate.description.length; i++) {
                val.description.push(candidate.description[i]);
            }


        }
    });

    fs.writeFileSync('profile.json', JSON.stringify(profiles));
    next();
}

function req_events(req, res, next) {
    var event = JSON.parse(JSON.stringify(req.body));
    var events = JSON.parse(fs.readFileSync('fc/event.json', 'utf8'));
    events.push(event);
    fs.writeFileSync('fc/event.json', JSON.stringify(events));
    next();

}

var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get('/id-candidate', respon_cand);
server.get('/vacancies-grid', respond_grid);
server.get('/newcand', respond_newcand);
server.get('/interview', respond_events);
server.get('/', function (req, res, next) {
    res.send("zdarova");
    return next();
});
server.get('/index', function (req, res, next) {
    res.send("zdarova");
    return next();
});
server.post('/id-candidate', req_idcand);
server.post('/interview', req_events);



server.listen(8080, '127.0.0.1', function () {

    console.log('%s listening at %s', server.name, server.url);

});