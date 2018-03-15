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

function openTab() {


    console.log(id);
}

$(function () {


    var now = new Date();
    now = now.getTime() / 1000;
    $.getJSON('grid.json', function (data) {
        $.each(data, function (key, val) {
            if (!val['photo']) {
                val['photo'] = 'anounymus';
            }

            var dateOfAddUser = (now - val['date']) / 86400;
            if (dateOfAddUser < 1) val['date'] = 'today';
            else if (1 < dateOfAddUser && 2 > dateOfAddUser) val['date'] = '1 day later';
            else if (2 < dateOfAddUser && 3 > dateOfAddUser) val['date'] = '2 day later';
            else if (3 < dateOfAddUser && 4 > dateOfAddUser) val['date'] = '3 day later';
            else if (4 < dateOfAddUser && 5 > dateOfAddUser) val['date'] = '4 day later';
            else if (5 < dateOfAddUser && 6 > dateOfAddUser) val['date'] = '5 day later';
            else if (6 < dateOfAddUser && 7 > dateOfAddUser) val['date'] = '6 day later';
            else if (7 < dateOfAddUser && 14 > dateOfAddUser) val['date'] = 'about 1 week';
            else if (14 < dateOfAddUser && 20 > dateOfAddUser) val['date'] = 'about 2 weeks';
            else if (20 < dateOfAddUser && 27 > dateOfAddUser) val['date'] = 'about 3 weeks';
            else if (27 < dateOfAddUser) val['date'] = 'оч старый';
            var id = val['id'];
            $('#grid').append(
                "<div class=\"col-lg-3 col-md-4 col-xs-6 grid__candidate all " + val['status'] + '">' +
                '<a   href="../Training-team-6/id-candidate.html?id=' + id + ' ">' +
                '<div class="grid__candidate__box">' +
                '<div class="grid__candidate__box__icon">' +
                '<div class="grid__candidate__box__icon__status">' + val['status'] + '</div>' +
                '<img src="images/' + val['photo'] + '.png" alt="user">' +
                '</div>' +
                '<div class="grid__candidate__box__position">' + val['Position'] + '</div>' +
                '<div class="grid__candidate__box__name">' + val['name'] + '</div>' +
                '<div class="grid__candidate__box__salary">' + val['salary'] + '</div>' +
                '<div class="grid__candidate__box__date">' + val['date'] + '</div>' +
                '</a>' +
                '</div>'
            );


        });
    });
});
//

//
// $(document).ready(function () {
//     $('#grid').bind("click", openTab);
//     //$(document).on("click", "div", openTab)
//
// });

