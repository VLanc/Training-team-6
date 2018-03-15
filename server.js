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
    adress: " ",
    city: " ",
    mobileNumber: "",
    email: "",
    salary: "",
    photo: "",
    skills: "",
    info: [
      {
        time: "",
        pos: "",
        header: "",
        body: ""
      },
      {
        time: "",
        pos: "",
        header: "",
        body: ""
      },
      {
        time: "",
        pos: "",
        header: "",
        body: ""

      }
    ],

    education: [
      {
        time: "",
        pos: "",
        header: "",
        body: ""
      }
    ]

  };
  var id = req.query.id;


  // console.log(id);

  var obj = JSON.parse(fs.readFileSync('profile.json', 'utf8'));

  obj.forEach(function (val) {

    if (val.id === id) {

      candidate.id = val.id;
      candidate.position = val.position;
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
        candidate.info[i].time = val.info[i].time;
        candidate.info[i].pos = val.info[i].pos;
        candidate.info[i].header = val.info[i].header;
        candidate.info[i].body = val.info[i].body;


      }

      for (var i = 0; i<val.education.length; i++)
      {
        candidate.education[i].time = val.education[i].time;
        candidate.education[i].pos = val.education[i].pos;
        candidate.education[i].header = val.education[i].header;
        candidate.education[i].body = val.education[i].body;
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

server.post('/test', function (req, res, next) {

  console.log(req.body);

});

server.listen(8080, '127.0.0.1', function () {
  console.log('%s listening at %s', server.name, server.url);
});