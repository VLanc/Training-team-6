$(function () {
    $.getJSON('data.json', function (data) {
        $.each(data, function (key, val) {
            if (!val['photo']) {
                val['photo'] = 'anounymus';
            };

            $('#grid').append('<div class="col-lg-2 col-md-3 col-xs-3 grid__candidate">' +
                '<div class="grid__candidate_icon">' +
                // '<a href="#"><img src="images/' + val['photo'] || 'anounymus' + '.png" alt="user"></a>' +
                '<a href="id-candidate.html"><img src="images/' + val['photo']  + '.png" alt="user"></a>' +
                '</div>' +
                '<div class="grid__candidate_icon__position">' + val['Position'] +
                '</div>' +
                '<div class="grid__candidate_icon__name">' + val['Name'] +
                '</div>' +
                '<div class="grid__candidate_icon__salary">' + val['salary'] + '</div></div>');
        });
    });
});