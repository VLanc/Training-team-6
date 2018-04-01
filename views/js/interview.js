$(document).ready(function () {
    var participants = "";
    var url = "/newcand";

    $.getJSON(url, function (candidates) {
        participants = candidates;
    });

    var events = "";
    var eventsUrl = "/interview";
    $.getJSON(eventsUrl, function (data) {
        events = data;
    });

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        weekNumberCalculation: 'ISO',
        eventLimit: true,
        selectable: true,
        events: {
            url: '/interview'
        },
        dayClick: function (date) {
            $('#new-event-modal').modal('show');

            var currentDate = date["_d"];
            currentDate.setHours(23, 59);
            $(".event-start-datepicker").data('datepicker').selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
            $(".event-end-datepicker").data('datepicker').selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()));
        },
        eventRender: function (event, element) {
            element.bind('dblclick', function () {
                var url = "id-interview.html?id=" + event.id;
                window.open(url, "_self");
            });
        }
    });

    $.each(participants, function (key, val) {
        var participantHtml = "<option value=\"" + key + "\">" + val["name"] + "</option>";
        $("#select-participant").append(participantHtml);
    });

    function clearModalWindow() {
        $("#event-title").val("");
        $("#event-start-date").val("");
        $("#event-end-date").val("");
        $("#select-participant").val($("#select-participant option:first").val());
    }

    $("#save-event-button").click(function (e) {
        var eventId = events.length + 1;
        var eventTitle = $("#event-title").val();
        var eventStartDate = $("#event-start-date").val().replace(" ", "T");
        var eventEndDate = $("#event-end-date").val().replace(" ", "T");
        var eventParticipantIndex = $("#select-participant option:selected").val();
        var eventParticipant = $("#select-participant option:selected").html();
        eventTitle += " - " + eventParticipant;
        var eventColor = $("#current-event-color").css("backgroundColor");
        var eventLocation = $("#event-location").val();
        var eventDescription = $("#event-description").val();
        if (!eventTitle || !eventStartDate || !eventEndDate || !eventParticipantIndex) return;

        var event = {
            id: eventId,
            title: eventTitle,
            allDay: false,
            start: eventStartDate,
            end: eventEndDate,
            color: eventColor,
            participant: eventParticipant,
            participantIndex: eventParticipantIndex,
            location: eventLocation,
            description: eventDescription
        };
        var url = "/interview?";

        $.post(url, event);
        $('#calendar').fullCalendar('renderEvent', event, true);

        e.preventDefault();
        clearModalWindow();
        $('#new-event-modal').modal('hide');
    });

    $('#new-event-modal').on('hide.bs.modal', function () {
        clearModalWindow();
    });

    $(".event-start-datepicker").datepicker({
        onSelect: function onSelect(date) {
            $("#event-start-date").val(date);
        }
    });

    $(".event-end-datepicker").datepicker({
        onSelect: function onSelect(date) {
            $("#event-end-date").val(date);
        }
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


    $("#other-options-button").click(function () {
        var isOtherOptionsHidden = $("#other-options-wrapper").hasClass("hidden");
        if (isOtherOptionsHidden) {
            $("#other-options-button").html("Hide other options");
            $("#other-options-wrapper").removeClass("hidden");
            $("#other-options-wrapper").addClass("visible");
        } else {
            $("#other-options-button").html("Show other options");
            $("#other-options-wrapper").removeClass("visible");
            $("#other-options-wrapper").addClass("hidden");
        }

    });
});