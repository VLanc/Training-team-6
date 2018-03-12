$(document).ready(function () {
    $.getJSON( "http://127.0.0.1:8000/test", function( data ) {
        $("#name").html(data.name);
    })
});

