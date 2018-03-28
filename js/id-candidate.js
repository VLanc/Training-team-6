var data = "";
var flagreview = true;
var qtest = 1111;

$(document).ready(function () {

  var url = "http://127.0.0.1:8080/id-candidate?" + window.location.href.split('?')[1];

  $.getJSON(url, function (candidate) {
    data = candidate;

    // process of obtaining a profile photo
    var photo = data.photo ? data.photo : 'anounymus';
    photo = 'images/' + photo + '.png';

    //process of obtaining a written date display
    var date = data.date;
    var now = new Date();
    now = now.getTime() / 1000;
    var dateOfAddUser = (now - date) / 86400;

    if (dateOfAddUser < 1) date = 'today';
    else if (1 < dateOfAddUser && 2 > dateOfAddUser) date = '1 day later';/*TODO: https://www.w3schools.com/js/js_switch.asp*/
    else if (2 < dateOfAddUser && 3 > dateOfAddUser) date = '2 day later';
    else if (3 < dateOfAddUser && 4 > dateOfAddUser) date = '3 day later';
    else if (4 < dateOfAddUser && 5 > dateOfAddUser) date = '4 day later';
    else if (5 < dateOfAddUser && 6 > dateOfAddUser) date = '5 day later';
    else if (6 < dateOfAddUser && 7 > dateOfAddUser) date = '6 day later';
    else if (7 < dateOfAddUser && 14 > dateOfAddUser) date = 'about 1 week';
    else if (14 < dateOfAddUser && 20 > dateOfAddUser) date = 'about 2 weeks';
    else if (20 < dateOfAddUser && 27 > dateOfAddUser) date = 'about 3 weeks';
    else if (27 < dateOfAddUser) date = 'a month ago';

    //process of obtaining data for skills
    var patternSkills = '';
    var skills = data.skills.split(";");
    for (var countSkills = 0; countSkills < skills.length; countSkills++) {
      patternSkills += '<div class="skills__skill">' + skills[countSkills] + '</div>';
    }

    $('#position').html(data.position);
    $('#name').html(data.name);
    $('#salary').html(data.salary);
    $('#phone').html(data.mobileNumber);
    $('#email').html(data.email);
    $('#address').html(data.address);
    $('#breadCrumbs').html(data.name);
    $('#avatar').attr({src: photo});
    $('#date').append(date);
    $('#timeLine').append(prepareTimeline());
    $('#skills').append(patternSkills);

  });


});

//process of obtaining data for timeLine
function prepareTimeline() {

  var timeLine = '';
  var experience = data.info;
  var countExperience = experience.length ;
  for (; countExperience > 0; countExperience--) {
    var index = countExperience - 1;
    timeLine += '<div class="timeline__unit">' +
      '<div class="timeline__unit__left-information">' +
      '<div class="timeline__unit__left-information__date">' + experience[index].time + '</div>' +
      '<div class="timeline__unit__left-information__position">' + experience[index].pos + '</div></div>' +
      '<div class="timeline__unit__diagram">' +
      '<div class="timeline__unit__diagram__dot"></div>' +
      '<div class="timeline__unit__diagram__line__job"></div>' +
      '</div>' +
      '<div class="timeline__unit__right-information">' +
      '<div class="timeline__unit__right-information__name-of-place">' + experience[index].header + '</div>' +
      '<div class="timeline__unit__right-information__responsibility">' + experience[index].body + '</div></div>' +
      '</div>';
  }

  var education = data.education;
  for (var countEducation = 0; countEducation < education.length; countEducation++) {
    timeLine += '<div class="timeline__unit">' +

      '<div class="timeline__unit__left-information">' +
      '<div class="timeline__unit__left-information__date">' + education[countEducation].time + '</div>' +
      '<div class="timeline__unit__left-information__position">' + education[countEducation].pos + '</div></div>' +
      '<div class="timeline__unit__diagram">' +
      '<div class="timeline__unit__diagram__dot"></div>' +
      '<div class="timeline__unit__diagram__line__study"></div>' +
      '</div>' +
      '<div class="timeline__unit__right-information">' +
      '<div class="timeline__unit__right-information__name-of-place">' + education[countEducation].header + '</div>' +
      '<div class="timeline__unit__right-information__responsibility">' + education[countEducation].body + '</div></div>' +
      '</div>';
  }
  return  timeLine.split("").reverse().join("").replace('__enil__margaid__tinu__enilemit', '').split("").reverse().join("");
}

function editData() {/*TODO: all that block looks super hackish. Hide and show wrappers of fields, not each field*/
  $('#editData, #position, #salary, #name, #phone, #email, #address').addClass("hidden");
  $('#saveData, #positionEdit, #salaryEdit, #nameEdit, #phoneEdit, #emailEdit, #addressEdit, #buttonExperience, #buttonSkills')
    .removeClass("hidden");

  $('#positionEdit').val($('#position').html());
  $('#salaryEdit').val($('#salary').html());
  $('#nameEdit').val($('#name').html());
  $('#phoneEdit').val($('#phone').html());
  $('#emailEdit').val($('#email').html());
  $('#addressEdit').val($("#address").html());

}


function saveData() {/*TODO: all that block looks super hackish. Hide and show wrappers of fields, not each field*/
  $('#saveData, #positionEdit, #salaryEdit, #nameEdit, #phoneEdit, #emailEdit, #addressEdit, #buttonExperience, #buttonSkills')
    .addClass("hidden");
  $('#editData, #position, #salary, #name, #phone, #email, #address').removeClass("hidden");

  $('#position').html($('#positionEdit').val());
  $('#salary').html($('#salaryEdit').val());
  $('#name').html($('#nameEdit').val());
  $('#phone').html($('#phoneEdit').val());
  $('#email').html($('#emailEdit').val());
  $('#address').html($('#addressEdit').val());
  $('#breadCrumbs').html(data.name);

  data.position = $('#positionEdit').val();
  data.salary = $('#salaryEdit').val();
  data.name = $('#nameEdit').val();
  data.mobileNumber = $('#phoneEdit').val();
  data.email = $('#emailEdit').val();
  data.address = $('#addressEdit').val();

  var url = "http://127.0.0.1:8080/id-candidate?";
  $.post(url, data);

}

function addSkill() {
  $('#modalWindowSkill').modal('show');
}

function addExperience() {
  $('#modalWindowExperience').modal('show');
}
/************TODO FOR NIKITA ********************/
function saveSkill() {
  var skill = $('#addWindowSkill').val();
  skill.toUpperCase();
  if (skill.length > 0) {
    $('#skills').append('<div class="skills__skill">' + skill + '</div>');

    data.skills += ';' + skill;

    closeModalWindow();
  } else {
    alert('Data can not be saved. Sorry :(');
  }
}


function saveExperience() {
  var experience = {
    time: '',
    pos: '',
    header: '',
    body: ''
  };
  experience.time = $('#addDateExperience').val();
  experience.pos = $('#addPlaceExperience').val();
  experience.header = $('#addPositionExperience').val();
  experience.body = $('#addBodyExperience').val();
  data.info.push(experience);

  $('#timeLine').empty().append(prepareTimeline());

  closeModalWindow();
}

function openModalWindowDescription() {

  var dateObject = new Date(data.date * 1000);
  receiptDate = dateObject.toDateString();

  $(document).ready(function () {
    $('#descriptionName').html(data.name + "'s reviews");
    $('#receiptDate').html(receiptDate);
    if (flagreview) {
      for (var i = 0; i < data.description.length; i++) {
        $('#TabDescription').append(
          '<li class="nav-item">' +
          '<a class="nav-link" id="toForm2" data-toggle="tab" href="#' + i + '" role="tab"' +
          ' aria-controls="Form2" aria-selected="false">' + data.description[i].name + '</a>' +
          '</li>'
        );

        $('#myTabContent').append(
          '<div class="tab-pane fade" id="' + i + '"  aria-labelledby="Form2">' +
          '<textarea readonly class="form-control"  rows="7" name="desc2">' + data.description[i].review + '</textarea>' +
          '</div>'
        );
        flagreview = false;
      }
    }
    $('#modalWindowDescription').modal('show');
  });
}

function saveDescription() {

  var review = {
    name: "Main",
    review: $('#area1').val()
  };
  $('#area1').val("");

  $('#TabDescription').append(
    '<li class="nav-item">' +
    '<a class="nav-link" id="toForm2" data-toggle="tab" href="#' + qtest + '" role="tab"' +
    ' aria-controls="Form2" aria-selected="false">' + review.name + '</a>' +
    '</li>'
  );

  $('#myTabContent').append(
    '<div class="tab-pane fade" id="' + qtest + '"  aria-labelledby="Form2">' +
    '<textarea readonly class="form-control"  rows="7" name="desc2">' + review.review + ' </textarea> ' +
    '</div>'
  );
  qtest++;
  data.description.push(review);
  var url = "http://127.0.0.1:8080/id-candidate?";
  $.post(url, data);
  closeModalWindow();
}

function closeModalWindow() {
  $('.modal').modal('hide');
}