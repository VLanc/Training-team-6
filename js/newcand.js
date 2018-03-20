$(document).ready(function () {
    var data = "";
    var url="http://127.0.0.1:8080/newcand";

    $.getJSON( url, function( candidates ) {

        //данные пользователей хранятся в переменной data из файла profile.json/*TODO: translate file in english*/
        var i = 0;
        $.each(candidates, function (key, val) {
            i++;
            console.log(i +" "+ val['name']);

        });
        //в дата хранятся все кандидаты
        data = candidates;


    });


});