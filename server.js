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
        adress: " ",//TODO: why spaces here but not in the above fields? There is two "d" in address word
        city: " ",
        mobileNumber: "",
        email: "",
        salary: "",
        photo: "",
        skills: "",
        info: [



        ],

        education: [

        ]

    };
    var id = req.query.id;


    // console.log(id);

    var obj = JSON.parse(fs.readFileSync('profile.json', 'utf8')); //TODO: give a clear name for the object

    obj.forEach(function (val) {

        if (val.id === id) {

            candidate.id = val.id;//TODO: as fields names in the json and candidate template are the same better to go over object keys and fill with json data - Object.keys(obj).forEach(function(prop){console.log(prop)})
            candidate.position = val.position;
            candidate.date = val.date;
            candidate.name = val.name;
            candidate.salary = val.salary;
            candidate.adress = val.adress;
            candidate.city = val.city;
            candidate.mobileNumber = val.mobileNumber;
            candidate.email = val.email;
            candidate.salary = val.salary;
            candidate.photo = val.photo;
            candidate.skills = val.skills;
            for (var i = 0; i < val.info.length; i++) {


                    candidate.info.push(val.info[i]);
                    // candidate.info[i].time = val.info[i].time;
                    // candidate.info[i].pos = val.info[i].pos;
                    // candidate.info[i].header = val.info[i].header;
                    // candidate.info[i].body = val.info[i].body;
                }





            for (var i = 0; i < val.education.length; i++) {
                candidate.education.push(val.education[i]);
                // candidate.education[i].time = val.education[i].time;
                // candidate.education[i].pos = val.education[i].pos;
                // candidate.education[i].header = val.education[i].header;
                // candidate.education[i].body = val.education[i].body;
            }


        }

    });

    res.send(candidate);

    next();
}

function respond_grid(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var obj = JSON.parse(fs.readFileSync('grid.json', 'utf8'));

    res.send(obj);
    next();
}

function respond_newcand(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    var obj = JSON.parse(fs.readFileSync('grid.json', 'utf8'));

    res.send(obj);
    next();

}


var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/id-candidate', respon_cand);
server.get('/vacancies-grid', respond_grid);
server.get('/newcand', respond_newcand);
//server.head('/test', respond);

server.post('/id-candidate', function (req, res, next) {


    var candidate = JSON.parse(JSON.stringify(req.body));
    //console.log(candidate); //всё ок, выведет объект


    var obj = JSON.parse(fs.readFileSync('profile.json', 'utf8'));


    obj.forEach(function (val) {

        if (val.id === candidate.id) {


            val.position = candidate.position;//TODO: as fields names in the json and candidate template are the same better to go over object keys and fill with json data - Object.keys(obj).forEach(function(prop){console.log(prop)})
            val.name = candidate.name;
            val.salary = candidate.salary;
            val.adress = candidate.adress;
            val.city = candidate.city;
            val.mobileNumber = candidate.mobileNumber;
            val.email = candidate.email;
            val.salary = candidate.salary;
            val.photo = candidate.photo;
            val.skills = candidate.skills;
            val.info = [];
            for (var i = 0; i < candidate.info.length; i++) {
                //
                // val.info[i].time =  candidate.info[i].time;
                // val.info[i].pos = candidate.info[i].pos;
                // val.info[i].header = candidate.info[i].header;
                // val.info[i].body = candidate.info[i].body;
                val.info.push(candidate.info[i]);


            }

            val.education = [];
            for (var i = 0; i < candidate.education.length; i++) {

                // val.education[i].time = candidate.education[i].time;
                // val.education[i].pos = candidate.education[i].pos;
                // val.education[i].header = candidate.education[i].header;
                // val.education[i].body = candidate.education[i].body;
                val.education.push(candidate.education[i]);

            }


        }


    });


    fs.writeFileSync('profile.json', JSON.stringify(obj));
    next();

});

server.listen(8080, '127.0.0.1', function () {

    console.log('%s listening at %s', server.name, server.url);

});