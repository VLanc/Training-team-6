$(document).ready(function () {
    $('#saveData').hide();
    $('#profedit').hide();
    $('#salaryedit').hide();
    $('#nameedit').hide();
    $('#teledit').hide();
    $('#emailedit').hide();
    $('#adressedit').hide();

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

    $('#prof').html($('#profedit').val());
    $('#salary').html( $('#salaryedit').val());
    $('#name').html($('#nameedit').val());
    $('#tel').html($('#teledit').val());
    $('#email').html($('#emailedit').val());
    $('#adress').html($('#adressedit').val());





}