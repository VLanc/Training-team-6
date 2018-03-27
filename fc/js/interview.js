var data = "";
var url = "http://127.0.0.1:8080/newcand";

$.getJSON(url, function (candidates) {
  data = candidates;
});

$(document).ready(function () {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    /*defaultDate: '2018-03-12',*/
    /*navLinks: true,*/ // can click day/week names to navigate views
    /*weekNumbers: true,
    weekNumbersWithinDays: true,*/
    weekNumberCalculation: 'ISO',
    /*editable: true,*/
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    /*selectHelper: true,*/
    events: {
      url: 'http://127.0.0.1:8080/interview'
    },
    dayClick: function (date) {
      $('#new-event-modal').modal('show');

      var currentDate = date["_d"];
      currentDate.setHours(23, 59);
      $(".event-start-datepicker").data('datepicker').selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
      $(".event-end-datepicker").data('datepicker').selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()));
    }
    /*    eventClick: function(calEvent, jsEvent, view) {
          console.log('Event: ' + calEvent.title);
          console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          console.log('View: ' + view.name);
          $(this).css('border-color', 'red');
        }*/
  });

  $.each(data, function (key, val) {
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
    var eventTitle = $("#event-title").val();
    var eventStartDate = $("#event-start-date").val().replace(" ", "T");
    var eventEndDate = $("#event-end-date").val().replace(" ", "T");
    var eventParticipantIndex = $("#select-participant option:selected").val();
    var eventParticipant = $("#select-participant option:selected").html();
    eventTitle += " - " + eventParticipant;
    if (!eventTitle || !eventStartDate || !eventEndDate || !eventParticipantIndex) return;

    var event = {title: eventTitle, allDay: false, start: eventStartDate, end: eventEndDate};
    var url = "http://127.0.0.1:8080/interview?";

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

});