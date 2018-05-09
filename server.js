let fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const corsMiddleware = require('restify-cors-middleware');
let restify = require('restify');
let mailOptions, nodemailer, transporter;
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
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.requestLogger());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hrappdb'
});


server.get('/getUserByEmail', getUserByEmail);//
server.get('/login', login);//
server.get('/reset', reset_password);//
server.get('/events', respond_events);//
server.get('/vacancies', vacancies);//
server.get('/candidates', candidates);
server.get('/positions', positions);//
server.get('/getUsers', getUsers);//
server.get('/id-candidates', idCandidates);
server.get('/test', test1);

server.post('/saveCandidate', saveCandidate);
server.post('/saveVacancy', saveVacancy);//
server.post('/saveUser', saveUser);//
server.post('/register', register);//
server.post('/saveEvent', saveEvent);//

let port = process.env.PORT || 8080;
server.listen(port);
console.log("Server running at http://localhost:%d", port);


function login(req, res, next) {
  let email = req.query.email;
  let password = req.query.password;
  let user = foundUser(email);
  if (bcrypt.compareSync(password, user.password)) {
    res.send(user);
    next();
  } else {
    res.send();
    next();
  }

  //BD
  // let email = req.query.email;
  // let password = req.query.password;
  // let user = foundUser(email);
  // setTimeout(function () {
  //   if (bcrypt.compareSync(password, user.password)) {
  //     res.send(user);
  //     next();
  //   } else {
  //     res.send();
  //     next();
  //   }
  // }, 500);
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

  //BD
  // let email = req.query.email;
  // let user = foundUser(email);
  // setTimeout(function () {
  //   if (user.id) {
  //     mailOptions = {
  //       from: 'HRAPP <feronodemailer@gmail.com>',
  //       to: email,
  //       subject: 'HRAPP password reset',
  //       html: '<b>Your password:</b>' + user.password + ''
  //     };
  //     transporter.sendMail(mailOptions, function (err, info) {
  //       if (err) {
  //         return console.log(err);
  //       }
  //       return console.log("Message sent: " + info.response);
  //     });
  //     res.send("true");
  //     next();
  //   } else {
  //     res.send("false");
  //     next();
  //   }
  // }, 500);
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
    newUser.password = bcrypt.hashSync(user.password, salt);
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

  //BD
  // let user = JSON.parse(JSON.stringify(req.body));
  // let sql = "UPDATE users set ? WHERE id=" + user.id;
  // let query = connection.query(sql, user, function (error, result) {
  //   if (error) throw error;
  // });
}

function getUsers(req, res, next) {
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  res.send(users);
  next();

  //BD
  // let sql = "SELECT * from users";
  // let query = connection.query(sql, function (error, result) {
  //   if (error) throw error;
  //   let users = [];
  //   for (let i = 0; i < result.length; i++) {
  //     users.push(result[i]);
  //   }
  //   res.send(users);
  // });
}

function getUserByEmail(req, res, next) {
  let email = req.query.email;
  let user = foundUser(email);
  res.send(user);
  next();

  //BD
  // let email = req.query.email;
  // let user = foundUser(email);
  // setTimeout(function () {
  //   if (user.id) {
  //     res.send(user);
  //   } else {
  //     let temp;
  //     res.send(temp);
  //   }
  //   next();
  // }, 100);

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

  //BD
  // let user = {};
  // let sql = "SELECT * FROM users WHERE email='" + email + "'";
  // let query = connection.query(sql, function (error, result) {
  //   if (error) throw error;
  //   if (result[0]) {
  //     user.id = result[0].id;
  //     user.name = result[0].name;
  //     user.surname = result[0].surname;
  //     user.photo = result[0].photo;
  //     user.password = result[0].password;
  //     user.email = result[0].email;
  //     user.role = result[0].role;
  //     user.roleIndex = result[0].roleIndex;
  //   }
  // });
  // return user;

}


function test1(req, res, next) {

  // let email = "test@mail.ru";
  // let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  // let user;
  // users.forEach(function (val) {
  //   if (email == val.email) {
  //     user = val;
  //   }
  // });
  // res.send(user);
  let email = "asdfg.ru@gmail.com";
  let sql = "SELECT * FROM users WHERE email='" + email + "'";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    console.log(result[0].id);
    res.send(result[0]);
  });
}

function respond_events(req, res, next) {
  let events = JSON.parse(fs.readFileSync('event.json', 'utf8'));
  res.send(events);
  next();

  //BD
  // let sql = "SELECT * FROM events";
  // let query = connection.query(sql, function (error, result) {
  //   if (error) throw error;
  //   let events = [];
  //   result.map(function (val) {
  //     let sql = "SELECT * from interviewers WHERE id_event=" + val.id;
  //     let query = connection.query(sql, function (error, result) {
  //       if (error) throw error;
  //       val.interviewers = result.map(function (interviewer) {
  //         let temp = {};
  //         temp.id = interviewer.id_user;
  //         temp.interviewer = interviewer.name;
  //         return temp;
  //       });
  //     });
  //
  //     let sql2 = "SELECT * from participants WHERE id_event=" + val.id;
  //     let query2 = connection.query(sql2, function (error, result) {
  //       if (error) throw error;
  //       val.participants = result.map(function (participant) {
  //         let temp = {};
  //         temp.id = participant.id_candidate;
  //         temp.participant = participant.name;
  //         return temp;
  //       });
  //     });
  //     setTimeout(function () {
  //       let temp = {};
  //       temp.id = val.id;
  //       temp.title = val.title;
  //       temp.allDay = val.allDay;
  //       temp.start = val.start;
  //       temp.end = val.end;
  //       temp.color = val.color;
  //       temp.location = val.location;
  //       temp.description = val.description;
  //       temp.interviewers = val.interviewers;
  //       temp.participants = val.participants;
  //       events.push(temp);
  //     }, 5);
  //   });
  //
  //   setTimeout(function () {
  //     res.send(events);
  //   }, 500);
  // });
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
  if (newEvent) {
    newEvents.push(event);
  }
  fs.writeFileSync('event.json', JSON.stringify(newEvents));
  next();

  //BD
  // let event = JSON.parse(JSON.stringify(req.body));
  // let newEvent = true;
  // let sql3 = "SELECT * FROM events WHERE id=" + event.id;
  // let query = connection.query(sql3, function (error, result) {
  //   if (error) throw error;
  //   if (result[0].id) {
  //     newEvent = false;
  //   }
  // });
  //
  // setTimeout(function () {
  //   if (!newEvent) {
  //     let tempInterviewrs = event.interviewers;
  //     let tempParticipants = event.participants;
  //     let sql = "UPDATE events SET ? WHERE id="+event.id;
  //     let tempEvent = event;
  //     delete tempEvent.participants;
  //     delete tempEvent.interviewers;
  //     let query = connection.query(sql, tempEvent, function (error, result) {
  //       if (error) throw error;
  //     });
  //
  //     let sql2 = "DELETE FROM interviewers WHERE id_event="+event.id;
  //     let query2 = connection.query(sql2, function (error, result) {
  //       if (error) throw error;
  //     });
  //
  //     let sql3 = "DELETE FROM participants WHERE id_event="+event.id;
  //     let query3 = connection.query(sql3, function (error, result) {
  //       if (error) throw error;
  //     });
  //
  //     tempInterviewrs.map(function (val) {
  //       let sql = "INSERT INTO interviewers SET ?";
  //       let post = {id_event: event.id, id_user: val.id, name: val.interviewer};
  //       let query = connection.query(sql, post, function (error, result) {
  //         if (error) throw error;
  //       });
  //     });
  //
  //     tempParticipants.map(function (val) {
  //       let sql = "INSERT INTO participants SET ?";
  //       let post = {id_event: event.id, id_candidate: val.id, name: val.participant};
  //       let query = connection.query(sql, post, function (error, result) {
  //         if (error) throw error;
  //       });
  //     });
  //     next();
  //   } else {
  //     let tempInterviewrs = event.interviewers;
  //     let tempParticipants = event.participants;
  //     let sql = "INSERT INTO events SET ?";
  //     let tempEvent = event;
  //     delete tempEvent.participants;
  //     delete tempEvent.interviewers;
  //     let query = connection.query(sql, tempEvent, function (error, result) {
  //       if (error) throw error;
  //     });
  //
  //     tempInterviewrs.map(function (val) {
  //       let sql = "INSERT INTO interviewers SET ?";
  //       let post = {id_event: event.id, id_user: val.id, name: val.interviewer};
  //       let query = connection.query(sql, post, function (error, result) {
  //         if (error) throw error;
  //       });
  //     });
  //
  //     tempParticipants.map(function (val) {
  //       let sql = "INSERT INTO participants SET ?";
  //       let post = {id_event: event.id, id_candidate: val.id, name: val.participant};
  //       let query = connection.query(sql, post, function (error, result) {
  //         if (error) throw error;
  //       });
  //     });
  //     next();
  //   }
  // }, 10);

}

function positions(req, res, next) {
  let positions = JSON.parse(fs.readFileSync('positions.json', 'utf8'));
  res.send(positions);
  next();

  //BD
  // let positions=[];
  // let sql = "SELECT * FROM positions";
  // let query = connection.query(sql, function (error, result) {
  //   if (error) throw error;
  //   result.map(function (val) {
  //     let temp={};
  //     temp.id=val.id;
  //     temp.name=val.name;
  //     positions.push(temp);
  //   });
  // });
  // setTimeout(function () {
  //   res.send(positions);
  // },100);
}

function vacancies(req, res, next) {
  let obj = JSON.parse(fs.readFileSync('vacancies.json', 'utf8'));
  res.send(obj);
  next();

  //BD
  // let vacancies=[];
  // let sql = "SELECT * FROM vacancies";
  // let query = connection.query(sql, function (error, result) {
  //   result.map(function (val) {
  //     if (error) throw error;
  //     let temp={};
  //     temp.id=val.id;
  //     temp.position=val.position;
  //     temp.experience=val.experience;
  //     temp.salary=val.salary;
  //     temp.date=val.date;
  //     vacancies.push(temp);
  //   });
  // });
  // setTimeout(function () {
  //   res.send(vacancies);
  // },100);
  // next();
}

function saveVacancy(req, res, next) {
  let vacancy = JSON.parse(JSON.stringify(req.body));
  let vacancies = JSON.parse(fs.readFileSync('vacancies.json', 'utf8'));
  vacancies.push(vacancy);
  fs.writeFileSync('vacancies.json', JSON.stringify(vacancies));
  next();

  //BD
  // let vacancy = JSON.parse(JSON.stringify(req.body));
  // let sql="INSERT INTO vacancies SET ?";
  // let query = connection.query(sql,vacancy, function (error, result) {
  //   if (error) throw error;
  // });
  // next();
}


function saveCandidate(req, res, next) {
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


function candidates(req, res, next) {
  let candidates = JSON.parse(fs.readFileSync('profile.json', 'utf8'));
  res.send(candidates);
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
