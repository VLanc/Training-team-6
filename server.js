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
server.get('/addNewCandidate', addNewCandidate);
server.get('/removeVacancy', removeVacancy);
server.get('/removeCandidate', removeCandidate);

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
  setTimeout(function () {
    if (bcrypt.compareSync(password, user.password)) {
      res.send(user);
      next();
    } else {
      res.send();
      next();
    }
  }, 500);
}

function reset_password(req, res, next) {
  let email = req.query.email;
  let user = foundUser(email);
  setTimeout(function () {
    if (user.id) {
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
  }, 500);
}


function register(req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));
  if (foundUser(user.email).id) {
    next();
  } else {
    let newUser = {};
    newUser.email = user.email;
    newUser.password = bcrypt.hashSync(user.password, salt);
    newUser.role = "";
    newUser.roleIndex = "";
    newUser.name = "";
    newUser.surname = "";
    newUser.photo = "";
    let query = connection.query("INSERT INTO users SET ?", newUser, function (error, result) {
      if (error) throw error;
    });
    let tempUser = foundUser(newUser.email);
    setTimeout(function () {
      res.send(tempUser);
    }, 100);
    next();
  }
}

function saveUser(req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));
  let sql = "UPDATE users set ? WHERE id=" + user.id;
  let query = connection.query(sql, user, function (error, result) {
    if (error) throw error;
  });
}

function getUsers(req, res, next) {
  let sql = "SELECT * from users";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    let users = [];
    for (let i = 0; i < result.length; i++) {
      users.push(result[i]);
    }
    res.send(users);
  });
}

function getUserByEmail(req, res, next) {
  let email = req.query.email;
  let user = foundUser(email);
  setTimeout(function () {
    if (user.id) {
      res.send(user);
    } else {
      let temp;
      res.send(temp);
    }
    next();
  }, 100);

}

function foundUser(email) {
  let user = {};
  let sql = "SELECT * FROM users WHERE email='" + email + "'";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    if (result[0]) {
      user.id = result[0].id;
      user.name = result[0].name;
      user.surname = result[0].surname;
      user.photo = result[0].photo;
      user.password = result[0].password;
      user.email = result[0].email;
      user.role = result[0].role;
      user.roleIndex = result[0].roleIndex;
    }
  });
  return user;

}


function saveEvent(req, res, next) {
  let event = JSON.parse(JSON.stringify(req.body));
  let newEvent = true;
  let sql3 = "SELECT * FROM events WHERE id=" + event.id;
  let query = connection.query(sql3, function (error, result) {
    if (error) throw error;
    if (result[0]) {
      newEvent = false;
    }

  });

  setTimeout(function () {
    if (!newEvent) {
      let tempInterviewrs = event.interviewers;
      let tempParticipants = event.participants;
      let sql = "UPDATE events SET ? WHERE id=" + event.id;
      let tempEvent = event;
      delete tempEvent.participants;
      delete tempEvent.interviewers;
      let query = connection.query(sql, tempEvent, function (error, result) {
        if (error) throw error;
      });

      let sql2 = "DELETE FROM interviewers WHERE id_event=" + event.id;
      let query2 = connection.query(sql2, function (error, result) {
        if (error) throw error;
      });

      let sql3 = "DELETE FROM participants WHERE id_event=" + event.id;
      let query3 = connection.query(sql3, function (error, result) {
        if (error) throw error;
      });

      tempInterviewrs.map(function (val) {
        let sql = "INSERT INTO interviewers SET ?";
        let post = {id_event: event.id, id_user: val.id, name: val.interviewer};
        let query = connection.query(sql, post, function (error, result) {
          if (error) throw error;
        });
      });

      tempParticipants.map(function (val) {
        let sql = "INSERT INTO participants SET ?";
        let post = {id_event: event.id, id_candidate: val.id, name: val.participant};
        let query = connection.query(sql, post, function (error, result) {
          if (error) throw error;
        });
      });
      next();
    } else {
      let tempInterviewrs = event.interviewers;
      let tempParticipants = event.participants;
      let sql = "INSERT INTO events SET ?";
      let tempEvent = event;
      delete tempEvent.participants;
      delete tempEvent.interviewers;
      let query = connection.query(sql, tempEvent, function (error, result) {
        if (error) throw error;
      });

      tempInterviewrs.map(function (val) {
        let sql = "INSERT INTO interviewers SET ?";
        let post = {id_event: event.id, id_user: val.id, name: val.interviewer};
        let query = connection.query(sql, post, function (error, result) {
          if (error) throw error;
        });
      });

      tempParticipants.map(function (val) {
        let sql = "INSERT INTO participants SET ?";
        let post = {id_event: event.id, id_candidate: val.id, name: val.participant};
        let query = connection.query(sql, post, function (error, result) {
          if (error) throw error;
        });
      });
      next();
    }
  }, 10);

}

function positions(req, res, next) {
  let positions = [];
  let sql = "SELECT * FROM positions";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    result.map(function (val) {
      let temp = {};
      temp.id = val.id;
      temp.name = val.name;
      positions.push(temp);
    });
  });
  setTimeout(function () {
    res.send(positions);
  }, 100);
}

function vacancies(req, res, next) {
  let vacancies = [];
  let sql = "SELECT * FROM vacancies";
  let query = connection.query(sql, function (error, result) {
    result.map(function (val) {
      if (error) throw error;
      let temp = {};
      temp.id = val.id;
      temp.position = val.position;
      temp.experience = val.experience;
      temp.salary = val.salary;
      temp.date = val.date;
      vacancies.push(temp);
    });
  });
  setTimeout(function () {
    res.send(vacancies);
  }, 100);
  next();
}

function saveVacancy(req, res, next) {
  let vacancy = JSON.parse(JSON.stringify(req.body));
  let sql = "INSERT INTO vacancies SET ?";
  let post={position: vacancy.position, experience: vacancy.experience, salary: vacancy.salary, date: vacancy.date};
  let query = connection.query(sql, post, function (error, result) {
    if (error) throw error;
  });
  next();
}

function respond_events(req, res, next) {
  let sql = "SELECT * FROM events";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    let events = [];
    result.map(function (val) {
      let sql = "SELECT * from interviewers WHERE id_event=" + val.id;
      let query = connection.query(sql, function (error, result) {
        if (error) throw error;
        val.interviewers = result.map(function (interviewer) {
          let temp = {};
          temp.id = interviewer.id_user;
          temp.interviewer = interviewer.name;
          return temp;
        });
      });

      let sql2 = "SELECT * from participants WHERE id_event=" + val.id;
      let query2 = connection.query(sql2, function (error, result) {
        if (error) throw error;
        val.participants = result.map(function (participant) {
          let temp = {};
          temp.id = participant.id_candidate;
          temp.participant = participant.name;
          return temp;
        });
      });
      setTimeout(function () {
        let temp = {};
        temp.id = val.id;
        temp.title = val.title;
        temp.allDay = val.allDay;
        temp.start = val.start;
        temp.end = val.end;
        temp.color = val.color;
        temp.location = val.location;
        temp.description = val.description;
        temp.interviewers = val.interviewers;
        temp.participants = val.participants;
        events.push(temp);
      }, 5);
    });

    setTimeout(function () {
      res.send(events);
    }, 500);
  });
}

function candidates(req, res, next) {
  let sql = "SELECT * FROM candidates";
  let query = connection.query(sql, function (error, result) {
    if (error) throw error;
    let candidates = [];
    result.map(function (candidate) {

      let sql = "SELECT * FROM reviews WHERE candidate_id=" + candidate.id;
      let query = connection.query(sql, function (error, result) {
        candidate.reviews = result.map(function (review) {
          let temp = {};
          temp.name = review.name;
          temp.content = review.content;
          return temp;
        });
      });

      let sql2 = "SELECT * FROM experiences WHERE candidate_id=" + candidate.id;
      let query2 = connection.query(sql, function (error, result) {
        candidate.experiences = result.map(function (experienсe) {
          let temp = {};
          temp.timeStart = experienсe.timeStart;
          temp.timeEnd = experienсe.timeEnd;
          temp.job = experienсe.job;
          temp.position = experienсe.position;
          temp.company = experienсe.company;
          temp.responsibility = experienсe.responsibility;
          return temp;
        });
      });

      setTimeout(function () {
        let temp = {};
        temp.id = candidate.id;
        temp.date = candidate.date;
        temp.position = candidate.position;
        temp.status = candidate.status;
        temp.name = candidate.name;
        temp.address = candidate.address;
        temp.city = candidate.city;
        temp.phone = candidate.phone;
        temp.email = candidate.email;
        temp.salary = candidate.salary;
        temp.photo = candidate.photo;
        temp.skills = candidate.skills;
        temp.reviews = candidate.reviews;
        temp.experiences = candidate.experiences;
        candidates.push(temp);
      }, 5);
    });

    setTimeout(function () {
      res.send(candidates);
    }, 300);
  });
  next();
}

function saveCandidate(req, res, next) {
  let candidate = JSON.parse(JSON.stringify(req.body));
  let sql_del = "DELETE FROM candidates WHERE id=" + candidate.id;
  let sql_del2 = "DELETE FROM reviews WHERE candidate_id=" + candidate.id;
  let sql_del3 = "DELETE FROM experiences WHERE candidate_id=" + candidate.id;
  connection.query(sql_del);
  connection.query(sql_del2);
  connection.query(sql_del3);

  let reviews = candidate.reviews;
  let experiences = candidate.experiences;
  delete candidate.reviews;
  delete candidate.experiences;
  let sql = "INSERT INTO candidates SET ?";
  connection.query(sql, candidate);

  experiences.map(function (experience) {
    let post = {
      candidate_id: candidate.id, timeStart: experience.timeStart, timeEnd: experience.timeEnd,
      job: experience.job, position: experience.position, company: experience.company,
      responsibility: experience.responsibility
    };
    let sql = "INSERT INTO experiences SET ?";
    connection.query(sql, post);
  });

  reviews.map(function (review) {
    let post = {candidate_id: candidate.id, name: review.name, content: review.content};
    let sql = "INSERT INTO reviews SET ?";
    connection.query(sql, post);
  });


}


function idCandidates(req, res, next) {
  let candidate = {};
  let id = +req.query.id;
  let sql = "SELECT * FROM candidates WHERE id=" + id;
  let query = connection.query(sql, function (error, result) {
    candidate.id = result[0].id;
    candidate.date = result[0].date;
    candidate.position = result[0].position;
    candidate.status = result[0].status;
    candidate.name = result[0].name;
    candidate.address = result[0].address;
    candidate.city = result[0].city;
    candidate.phone = result[0].phone;
    candidate.email = result[0].email;
    candidate.salary = result[0].salary;
    candidate.photo = result[0].photo;
    candidate.skills = result[0].skills;
  });

  let sql2 = "SELECT * FROM reviews WHERE candidate_id=" + id;
  let query2 = connection.query(sql2, function (error, result) {
    candidate.reviews = [];
    result.map(function (review) {
      candidate.reviews.push(review);
    })
  });

  let sql3 = "SELECT * FROM experiences WHERE candidate_id=" + id;
  let query3 = connection.query(sql3, function (error, result) {
    candidate.experiences = [];
    result.map(function (experience) {
      candidate.experiences.push(experience);
    });
    res.send(candidate);
  });
  next();
}

function addNewCandidate(req, res, next) {
  let candidate = {};
  candidate.date = String(Date.now()).substring(0, 10);
  candidate.position = "Enter new cand position please";
  candidate.status = "New";
  candidate.name = "TempNameCand";
  candidate.address = "Enter candidate address please";
  candidate.city = "Enter candidate city please";
  candidate.phone = "Enter candidate phone please";
  candidate.email = "Enter candidate email please";
  candidate.salary = 9999;
  candidate.photo = "";
  candidate.skills = "";
  let sql = "INSERT INTO candidates SET ?";
  connection.query(sql, candidate);
  let sql2 = "SELECT id FROM candidates WHERE name='TempNameCand'";
  let obj = {};
  connection.query(sql2, function (error, result) {
    obj.id = result[0].id;
  });
  setTimeout(function () {
    let sql = "UPDATE candidates SET name='New cand name' WHERE id=" + obj.id;
    connection.query(sql);
    res.send(obj);
  }, 200);
  next();
}

function removeVacancy(req, res, next) {
  let id = req.query.id;
  let sql = "DELETE FROM vacancies WHERE id="+id;
  connection.query(sql);
  next();
}

function removeCandidate(req, res, next) {
  let id = req.query.id;
  let sql = "DELETE FROM candidates WHERE id="+id;
  connection.query(sql);
  next();
}
