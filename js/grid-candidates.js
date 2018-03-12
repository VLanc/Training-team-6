$(function () {

    var newSelection = "";

    $("#flavor-nav ").change(function () {

        $("#grid").fadeTo(200, 0.10);

        $("#flavor-nav option").removeClass("current");
        $(this).addClass("current");

        newSelection = $(this).attr("value");

        $(".grid__candidate").not("." + newSelection).slideUp();
        $("." + newSelection).slideDown();

        $("#grid").fadeTo(600, 1);
    });
});


$(function () {
    var now = new Date();
    now = now.getTime() / 1000;
    $.getJSON('data.json', function (data) {
        $.each(data, function (key, val) {
            if (!val['photo']) {
                val['photo'] = 'anounymus';
            }
            ;

            var dateOfAddUser = (now - val['date']) / 86400;
            if (dateOfAddUser < 1) val['date'] = 'today';
            else if (1 < dateOfAddUser && 2 > dateOfAddUser) val['date'] = '1 day later';
            else if (2 < dateOfAddUser && 3 > dateOfAddUser) val['date'] = '2 day later';
            else if (3 < dateOfAddUser && 4 > dateOfAddUser) val['date'] = '3 day later';
            else if (7 < dateOfAddUser && 14 > dateOfAddUser) val['date'] = 'about 1 week';
            else if (14 < dateOfAddUser && 20 > dateOfAddUser) val['date'] = 'about 2 weeks';
            else if (21 < dateOfAddUser && 27 > dateOfAddUser) val['date'] = 'about 3 weeks';
            else if (21 < dateOfAddUser && 27 > dateOfAddUser) val['date'] = 'a long time ago';

            $('#grid').append(
                '<div class="col-lg-3 col-md-4 col-xs-6 grid__candidate all ' + val['status'] + '">' +
                '<a href="#">' +
                '<div class="grid__candidate__box">' +
                '<div class="grid__candidate__box__icon">' +
                '<div class="grid__candidate__box__icon__status">' + val['status'] + '</div>' +
                '<img src="images/' + val['photo'] + '.png" alt="user">' +
                '</div>' +
                '<div class="grid__candidate__box__position">' + val['Position'] + '</div>' +
                '<div class="grid__candidate__box__name">' + val['Name'] + '</div>' +
                '<div class="grid__candidate__box__salary">' + val['salary'] + '</div>' +
                '<div class="grid__candidate__box__date">' + val['date'] + '</div>' +
                '</a>' +
                '</div>'
            );
        });
    });
});