var data = "";
$(document).ready(function () {
  $('#saveData').hide();
  $('#profedit').hide();
  $('#salaryedit').hide();
  $('#nameedit').hide();
  $('#teledit').hide();
  $('#emailedit').hide();
  $('#adressedit').hide();
  $('#bexperience').hide();
  $('#bkills').hide();


    var url = "http://127.0.0.1:8080/id-candidate?" + window.location.href.split('?')[1];

    $.getJSON(url, function (candidate) {


    data = candidate;
    //вот тут вносим данные, полученные с сервера
    $('#prof').html(data.position);
    $('#name').html(data.name);
    $('#salary').html(data.salary);
    $('#tel').html(data.mobileNumber);
    $('#email').html(data.email);
    $('#adress').html(data.adress);
    var skills = data.skills.split(";");
    for(var i=0;i<skills.length;i++) {
      $('#skills').append(
        '<label>' + skills[i] + '</label>'
      );
    }
    var education = data.education;
    for(var q=0;q<education.length;q++) {
      $('.placeholder').append(
        "<ul class='timeline'><li><time class='tmtime'>" +
        "<span>" + education[q].time + "</span>" +
        "<span>" + education[q].pos + "</span></time>" +
        "<div class='icon icon-phone'></div><div class='label'>"+
        "<h2>" + education[q].header + "</h2>" +
        "<p>" + education[q].body + "</p></div></li></ul>"
      );
    }
    var experience = data.info;
    for(var j=0;j<experience.length-1;j++) {
    $('.placeholder').append(
      "<ul class='timeline'><li><time class='tmtime'>" +
      "<span>" + experience[j].time + "</span>" +
      "<span>" + experience[j].pos + "</span></time>" +
      "<div class='icon icon-phone'></div><div class='label'><h2>" + experience[j].header + "</h2>" +
      "<p>" + experience[j].body + "</p></div></li></ul>"
    );
    }

        data = candidate;



        //вот тут вносим данные, полученные с сервера
        $('#prof').html(data.position);
        $('#name').html(data.name);
        $('#salary').html(data.salary);
        $('#tel').html(data.mobileNumber);
        $('#email').html(data.email);
        $('#adress').html(data.adress);
        var skills = data.skills.split(";");
        for (var i = 0; i < skills.length; i++) {
            $('#skills').append(
                '<label>' + skills[i] + '</label>'
            );
        }
        var education = data.education;
        for (var q = 0; q < education.length; q++) {
            $('.placeholder').append(
                "<ul class='timeline'><li><time class='tmtime'>" +
                "<span>" + education[q].time + "</span>" +
                "<span>" + education[q].pos + "</span></time>" +
                "<div class='icon icon-phone'></div><div class='label'>" +
                "<h2>" + education[q].header + "</h2>" +
                "<p>" + education[q].body + "</p></div></li></ul>"
            );
        }
        var experience = data.info;
        for (var j = 0; j < experience.length - 1; j++) {
            $('.placeholder').append(
                "<ul class='timeline'><li><time class='tmtime'>" +
                "<span>" + experience[j].time + "</span>" +
                "<span>" + experience[j].pos + "</span></time>" +
                "<div class='icon icon-phone'></div><div class='label'><h2>" + experience[j].header + "</h2>" +
                "<p>" + experience[j].body + "</p></div></li></ul>"
            );
        }




        var date = data.date;
        var now = new Date();
        now = now.getTime() / 1000;

        var dateOfAddUser = (now - date) / 86400;

        if (dateOfAddUser < 1) data.date = 'today';
        else if (1 < dateOfAddUser && 2 > dateOfAddUser) data.date = '1 day later';
        else if (2 < dateOfAddUser && 3 > dateOfAddUser) data.date = '2 day later';
        else if (3 < dateOfAddUser && 4 > dateOfAddUser) data.date = '3 day later';
        else if (4 < dateOfAddUser && 5 > dateOfAddUser) data.date = '4 day later';
        else if (5 < dateOfAddUser && 6 > dateOfAddUser) data.date = '5 day later';
        else if (6 < dateOfAddUser && 7 > dateOfAddUser) data.date = '6 day later';
        else if (7 < dateOfAddUser && 14 > dateOfAddUser) data.date = 'about 1 week';
        else if (14 < dateOfAddUser && 20 > dateOfAddUser) data.date = 'about 2 weeks';
        else if (20 < dateOfAddUser && 27 > dateOfAddUser) data.date = 'about 3 weeks';
        else if (27 < dateOfAddUser) data.date = 'a month ago';
        $('#date').append(
            "<p id='date' class='profile-time'>" + data.date + "</p>"
        );
    });


    //закрытие модального окна
    $('#modal_close, #overlay').click(function () {
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // уменьшаем прозрачность
                function () { // пoсле aнимaции
                    $(this).css('display', 'none'); // скрываем окно
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                }
            );
    });


});


function editData() {
    $('#editData').hide();
    $('#prof').hide();
    $('#salary').hide();
    $('#name').hide();
    $('#tel').hide();
    $('#email').hide();
    $('#adress').hide();


    $('#saveData').show();
    $('#profedit').show();
    $('#salaryedit').show();
    $('#nameedit').show();
    $('#teledit').show();
    $('#emailedit').show();
    $('#adressedit').show();
    $('#bexperience').show();
    $('#bkills').show();

    $('#profedit').val($('#prof').html());
    $('#salaryedit').val($('#salary').html());
    $('#nameedit').val($('#name').html());
    $('#teledit').val($('#tel').html());
    $('#emailedit').val($('#email').html());
    $('#adressedit').val($("#adress").html());

}


function saveData() {

    $('#editData').show();
    $('#prof').show();
    $('#salary').show();
    $('#name').show();
    $('#date').show();
    $('#tel').show();
    $('#email').show();
    $('#adress').show();


    $('#saveData').hide();
    $('#profedit').hide();
    $('#salaryedit').hide();
    $('#nameedit').hide();
    $('#teledit').hide();
    $('#emailedit').hide();
    $('#adressedit').hide();
    $('#bexperience').hide();
    $('#bkills').hide();

    $('#prof').html($('#profedit').val());
    $('#salary').html($('#salaryedit').val());
    $('#name').html($('#nameedit').val());
    $('#tel').html($('#teledit').val());
    $('#email').html($('#emailedit').val());
    $('#adress').html($('#adressedit').val());

    data.position = $('#profedit').val();
    data.salary = $('#salaryedit').val();
    data.name = $('#nameedit').val();
    data.mobileNumber = $('#teledit').val();
    data.email = $('#emailedit').val();
    data.adress = $('#adressedit').val();


    var url = "http://127.0.0.1:8080/id-candidate?";

    $.post(url, data);


}

function addSkill() {
    //открываем модальное окно
    event.preventDefault();
    $('#overlay').fadeIn(400, // анимируем показ обложки
        function () { // далее показываем мод. окно
            $('#modal_form')
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        });
}


function saveSkill() {
    var skill = $('#modalskill').val();
    skill.toUpperCase();
    if (skill.length > 0) {
        $('#skills').append(
            "<label>" + skill + "</label>"
        );
    }

    data.skills += ";" + skill;


    //закрытие модального окна


    $('#modal_form')
        .animate({opacity: 0, top: '45%'}, 200,  // уменьшаем прозрачность
            function () { // пoсле aнимaции
                $(this).css('display', 'none'); // скрываем окно
                $('#overlay').fadeOut(400); // скрывaем пoдлoжку
            }
        );


}



