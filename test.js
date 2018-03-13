$(document).ready(function () {
    $.getJSON( "http://127.0.0.1:8080/test", function( data ) {

        $("#name").html(data.name);
    })
});

/////////////