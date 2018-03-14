
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

    //закрытие модального окна
    $('#modal_close, #overlay').click( function(){
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // уменьшаем прозрачность
                function(){ // пoсле aнимaции
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


}

function addSkill() {
    //открываем модальное окно
    event.preventDefault();
    $('#overlay').fadeIn(400, // анимируем показ обложки
        function(){ // далее показываем мод. окно
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
        "<label>"+skill+"</label>"
        );
    }

    //закрытие модального окна

        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // уменьшаем прозрачность
                function(){ // пoсле aнимaции
                    $(this).css('display', 'none'); // скрываем окно
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                }
            );



}


$(function () {


    var now = new Date();
    now = now.getTime() / 1000;
    $.getJSON('profile.json', function (data) {
        $.each(data, function (key, val) {
            $('#prof').html(val['position']);
            $('#name').html(val['name']);
            $('#tel').html(val['mobileNumber']);
            $('#email').html(val['email']);
            $('#address').html(val['address']);
        });
    });
});
