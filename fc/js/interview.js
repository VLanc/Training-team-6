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
    selectable: true,
    /*selectHelper: true,*/
    events: {
      url: 'http://127.0.0.1:8080/interview'
    },
    dayClick: function (date, jsEvent, view) {
      $('#exampleModalCenter').modal('show');
      $("#event-start-date").val("" + date.format() + " 00:00");
      $("#event-end-date").val("" + date.format() + " 23:59");
    }
    /*    eventClick: function(calEvent, jsEvent, view) {

          console.log('Event: ' + calEvent.title);
          console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          console.log('View: ' + view.name);

          $(this).css('border-color', 'red');

        }*/


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


  $("#save-event-button").click(function (e) {

    var eventTitle = $("#event-title").val();
    var eventStartDate = $("#event-start-date").val().replace(" ", "T");
    var eventEndDate = $("#event-end-date").val().replace(" ", "T");
    var eventParticipantIndex = $("#select-participant option:selected").val();
    var eventParticipant = $("#select-participant option:selected").html();
    eventTitle += " - " + eventParticipant;
    if (!eventTitle || !eventStartDate || !eventEndDate || !eventParticipantIndex) return;

    var event = {title: eventTitle, start: eventStartDate, end: eventEndDate};

    $('#calendar').fullCalendar('renderEvent', event, true);

    e.preventDefault();
    clearModalWindow();
  });

  function clearModalWindow() {
    $("#event-title").val("");
    $("#event-start-date").val("");
    $("#event-end-date").val("");
    $("#select-participant").val($("#select-participant option:first").val());
  }

  $("#close-event-modal-button-top").click(function () {
    clearModalWindow();
  });

  $("#close-event-modal-button-bottom").click(function () {
    clearModalWindow();
  });

  var isCalendarForStartHidden = true;
  $("#show-calendar-button-for-start").click(function () {
    if (isCalendarForStartHidden) {
      $("#show-calendar-button-for-start").html("Hide calendar");
      isCalendarForStartHidden = false;
    } else {
      $("#show-calendar-button-for-start").html("Show calendar");
      isCalendarForStartHidden = true;
    }

    $(".event-start-datepicker").slideToggle("slow");
  });

  $(".event-start-datepicker").datepicker({
    onSelect: function onSelect(date) {
      $("#event-start-date").val(date);
    }
  });

  var isCalendarForEndHidden = true;
  $("#show-calendar-button-for-end").click(function () {
    if (isCalendarForEndHidden) {
      $("#show-calendar-button-for-end").html("Hide calendar");
      isCalendarForEndHidden = false;
    } else {
      $("#show-calendar-button-for-end").html("Show calendar");
      isCalendarForEndHidden = true;
    }

    $(".event-end-datepicker").slideToggle("slow");
  });

  $(".event-end-datepicker").datepicker({
    onSelect: function onSelect(date) {
      $("#event-end-date").val(date);
    }
  });

});
