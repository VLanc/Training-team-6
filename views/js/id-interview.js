var participants = "";
var participantsUrl = "http://127.0.0.1:8080/newcand";

$.getJSON(participantsUrl, function (candidates) {
    participants = candidates;
});

$(document).ready(function () {

    var event = "";
    var eventsUrl = "http://127.0.0.1:8080/id-interview?id=" + window.location.href.split('?')[1];
    $.getJSON(eventsUrl, function (data) {
        event = data;

        var eventTitle = event.title.split(" - ")[0];
        $("#event-title").val(eventTitle);
        $("#event-start-date").val(event.start.replace("T", " "));
        $(".event-start-datepicker").datepicker({
            onSelect: function onSelect(date) {
                $("#event-start-date").val(date);
            }
        });

        var startDate = new Date(event.start);
        $(".event-start-datepicker").data('datepicker').selectDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes()));

        $("#event-end-date").val(event.end.replace("T", " "));
        $(".event-end-datepicker").datepicker({
            onSelect: function onSelect(date) {
                $("#event-end-date").val(date);
            }
        });

        var endDate = new Date(event.end);
        $(".event-end-datepicker").data('datepicker').selectDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes()));

        $("#select-participant").val(event.participantIndex);
        $("#event-location").val(event.location);
        $("#current-event-color").css("backgroundColor", event.color);
        $("#event-description").val(event.description);
    });

    $("#event-color-pickers").click(function (e) {
        var target = e.target;
        if ($(target).attr("data-color")) {
            var selectedColor = $(target).attr("data-color");
            var lastClassCurrentColor = $("#current-event-color").attr('class').split(' ').pop();
            $("#current-event-color").removeClass(lastClassCurrentColor);
            $("#current-event-color").addClass(selectedColor);
        }
    });

    $.each(participants, function (key, val) {
        var participantHtml = "<option value=\"" + key + "\">" + val["name"] + "</option>";
        $("#select-participant").append(participantHtml);
    });

    $("#save-event-changes-button").click(function (e) {
        var eventTitle = $("#event-title").val();
        var eventStartDate = $("#event-start-date").val().replace(" ", "T");
        var eventEndDate = $("#event-end-date").val().replace(" ", "T");
        var eventParticipantIndex = $("#select-participant option:selected").val();

        if (!eventTitle || !eventStartDate || !eventEndDate || !eventParticipantIndex) return;

        e.preventDefault();

        var newEventObject = createModifiedEventObject();
        var url = "http://127.0.0.1:8080/id-interview?";
        $.post(url, newEventObject);

        $('#successful-saving-modal').modal('show');
    });

    $("#successful-saving-modal-ok-button").click(function () {
        window.open("interview.html", "_self");
    });

    function createModifiedEventObject() {
        var resObject = {
            id: event.id,
            title: $("#event-title").val(),
            allDay: false,
            start: $("#event-start-date").val().replace(" ", "T"),
            end: $("#event-end-date").val().replace(" ", "T"),
            color: $("#current-event-color").css("backgroundColor"),
            participant: $("#select-participant option:selected").html(),
            participantIndex: $("#select-participant option:selected").val(),
            location: $("#event-location").val(),
            description: $("#event-description").val()
        };
        return resObject;
    }

    $('#successful-saving-modal').on('hide.bs.modal', function () {
        window.open("interview.html", "_self");
    });

});