$(document).ready(function () {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    /*defaultDate: '2018-03-12',*/
    /*navLinks: true,*/ // can click day/week names to navigate views

    /*   dayClick: function (date, jsEvent, view) {
         var clickDate = date.format();
         $('#dialog').dialog('open');
       },*/
    /*weekNumbers: true,
    weekNumbersWithinDays: true,*/
    weekNumberCalculation: 'ISO',
    /*editable: true,*/
    eventLimit: true, // allow "more" link when too many events
    /*selectable: true,*/
    /*selectHelper: true,*/
    eventSources: [
      'fc/event.json'
    ]

  });
  // create object
  // var events = JSON.parse('event.json', 'utf8');
  /*  $('#dialog').dialog({
      autoOpen: false,
      minWidth: 600,
      show: {
        effect: 'drop',
        duration: 500
      },
      hide: {
        effect: 'clip',
        duration: 500
      }
    });
    $('.datepicker').datepicker({
      dateFormat: "yy-mm-dd"
    });*/


  $("#save-event-button").click(function () {

    $("#save-event-button").submit(function (e) {
      e.preventDefault();
    });

    var eventTitle = $("#event-title").val();
    var eventStartDate = $("#event-start-date").val().replace(" ", "T");
    var eventEndDate = $("#event-end-date").val().replace(" ", "T");
    var eventParticipant = $("#select-participant option:selected").html();
    eventTitle += " - " + eventParticipant;
    if (!eventTitle || !eventStartDate || !eventEndDate || !eventParticipant) return;

    var event = {title: eventTitle, start: eventStartDate, end: eventEndDate};

    $('#calendar').fullCalendar('renderEvent', event, true);

    $("#event-title").val("");
    $("#event-start-date").val("");
    $("#event-end-date").val("");
    $("#select-participant").val(0);

  });
});
