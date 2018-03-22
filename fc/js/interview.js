$(document).ready(function () {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    defaultDate: '2018-03-12',
    navLinks: true, // can click day/week names to navigate views

    dayClick: function (date, jsEvent, view) {
      var clickDate = date.format();
      $('#dialog').dialog('open');
    },
    weekNumbers: true,
    weekNumbersWithinDays: true,
    weekNumberCalculation: 'ISO',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    selectHelper: true,

    events: [
      {
        title: 'All Day Event',
        start: '2018-03-01'
      },
      {
        title: 'Long Event',
        start: '2018-03-07',
        end: '2018-03-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-03-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-03-16T16:00:00'
      },
      {
        title: 'бухнуть',
        start: '2018-03-11',
        end: '2018-03-13'
      },
      {
        title: 'Meeting',
        start: '2018-03-12T10:30:00',
        end: '2018-03-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2018-03-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2018-03-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2018-03-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2018-03-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2018-03-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2018-03-28'
      }
    ]
  });
  // create object
  // var events = JSON.parse('event.json', 'utf8');
  $('#dialog').dialog({
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
    dataFormat: "yy-mm-dd"
  });

});


function HideTime(){
  $(document).ready(function () {
    $('#time').hide();
  });
}
HideTime();
// $(document).ready(function () {
// $.getJSON('profile.json', function (candidate) {
//   data = candidate;
//   for (var g = 0; g < data.length; g++) {
//     $('#candidates-range').append(
//     '<option>'+data[g].name+'</option>'
//     );
//   }
// });
// });


function saveEvent() {

  var end = $('#end').html();
console.log(end);
}