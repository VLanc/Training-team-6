var data = "";
var url = "http://127.0.0.1:8080/newcand";

$.getJSON(url, function (candidates) {
  data = candidates;
});

$(function () {

  $.getJSON('fc/event.json', function (data) { //TODO server

    $.each(data.events, function (key, val) {
      var eventDate = val["start"].split("T")[0];
      var eventTime = val["start"].split("T")[1];
      if (!eventTime) eventTime = "";
      else eventTime = ", " + eventTime;
      var eventHtml = "                <div class=\"row no-gutters\" data-row=\"true\">\n" +
        "                  <div class=\"col\">\n" +
        "                    <a href=\"#\" class=\"d-flex notification-interview-wrapper\">\n" +
        "                      <div class=\"notification-interview-information-wrapper\">\n" +
        "                        <div class=\"notification-interview-type\">" + val["title"] + "</div>\n" +
        "                        <div class=\"notification-interview-time\">" + eventDate + eventTime + "</div>\n" +
        "                      </div>\n" +
        "                      <button type=\"button\" class=\"close delete-notification\" aria-label=\"Close\">\n" +
        "                        <span aria-hidden=\"true\" id=\"delete-notification-button\">&times;</span>\n" +
        "                      </button>\n" +
        "                    </a>\n" +
        "\n" +
        "                  </div>\n" +
        "              </div>";
      $(".notification-events-field").append(eventHtml);

    });

    var numberOfEvents = $(".notification-events-field").children().length;
    if (!numberOfEvents) return;

    var fieldHeight;
    if (numberOfEvents >= 3) {
      fieldHeight = $(".notification-events-field").children()[0].offsetHeight * 3 - 2;
      $(".notification-events-field").outerHeight(fieldHeight);
    } else if (numberOfEvents === 2) {
      fieldHeight = $(".notification-events-field").children()[0].offsetHeight * 2 - 2;
      $(".notification-events-field").outerHeight(fieldHeight);
    } else if (numberOfEvents === 1) {
      fieldHeight = $(".notification-events-field").children()[0].offsetHeight - 2;
      $(".notification-events-field").outerHeight(fieldHeight);
    }

    $(".notification-events-field").css('overflow-y', 'hidden');

  });
});


$(document).ready(function () {
  var isNotificationBarVisible = true;
  $("#notification-button").click(function () {
    if (isNotificationBarVisible) {
      $(".notification-bar")/*.css("visibility", "hidden")*/.fadeOut(200);
      isNotificationBarVisible = false;
    } else {
      $(".notification-bar")/*.css("visibility", "visible")*/.fadeIn(200);
      isNotificationBarVisible = true;
    }
  });

  $(function () {

    $.each(data, function (key, val) {
      var statusLowerCase = val.status.toLowerCase();
      if (statusLowerCase === "new") {
        var photoId;
        if (!val.photo) {
          photoId = "images/anounymus.png";
        } else {
          photoId = "images/" + val.photo + ".png";
        }

        var candidateHtml = "           <div class=\"row no-gutters\" data-row=\"true>\n" +
          "                    <div class=\"col\">\n" +
          "                      <a href=\"../Training-team-6/id-candidate.html?id=" + val['id'] + "\" class=\"d-flex notification-candidate-wrapper\">\n" +
          "                        <img src=\" " + photoId + "\" class=\"avatar-small\"></img>\n" +
          "                        <div class=\"notification-candidate-information-wrapper\">\n" +
          "                          <div class=\"notification-candidate-name\">" + val["name"] +
          "                          </div>\n" +
          "                          <div class=\"notification-candidate-email\">" + val["email"] +
          "                           </div>\n" +
          "                          <div class=\"notification-candidate-position\">" + val["position"] +
          "                         </div>\n" +
          "                        </div>\n" +
          "                        <button type=\"button\" class=\"close delete-notification\" aria-label=\"Close\">\n" +
          "                          <span aria-hidden=\"true\" id=\"delete-notification-button\">&times;</span>\n" +
          "                        </button>\n" +
          "                      </a>\n" +
          "\n" +
          "                    </div>\n" +
          "\n" +
          "                  </div>";
        $(".notification-candidates-field").append(candidateHtml);
      }
    })

    var numberOfCandidates = $(".notification-candidates-field").children().length;
    if (!numberOfCandidates) return;

    var fieldHeight;
    if (numberOfCandidates >= 3) {
      fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 3 - 2;
      $(".notification-candidates-field").outerHeight(fieldHeight);
    } else if (numberOfCandidates === 2) {
      fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 2 - 2;
      $(".notification-candidates-field").outerHeight(fieldHeight);
    } else if (numberOfCandidates === 1) {
      fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight - 2;
      $(".notification-candidates-field").outerHeight(fieldHeight);
    }

    $(".notification-candidates-field").css('overflow-y', 'hidden');
  });

  $("#view-all-candidates").click(function () {
      if ($(this).html() === "View all") {
        $("#view-all-candidates").html("Hide candidates");
        $(".notification-candidates-field").css('overflow-y', 'scroll');
      } else {
        $(".notification-candidates-field").scrollTop(0);
        $("#view-all-candidates").html("View all");
        $(".notification-candidates-field").css('overflow-y', 'hidden');
      }
    }
  );


  $("#view-all-events").click(function () {
      if ($(this).html() === "View all") {
        $("#view-all-events").html("Hide interviews");
        $(".notification-events-field").css('overflow-y', 'scroll');
      } else {
        $(".notification-events-field").scrollTop(0);
        $("#view-all-events").html("View all");
        $(".notification-events-field").css('overflow-y', 'hidden');
      }
    }
  );

  $(".notification-bar").click(function (event) {
    if (event.target.id === $("#delete-notification-button")[0].id) {

      var currentParent = event.target.parentElement;
      while (currentParent !== window) {
        var row = $(currentParent).attr("data-row");
        if (row) {
          break;
        }
        currentParent = currentParent.parentElement;
      }
      $(currentParent).remove();

      var numberOfEvents = $(".notification-events-field").children().length;
      var numberOfCandidates = $(".notification-candidates-field").children().length;

      if (numberOfEvents <= 3) {
        $(".notification-events-field").css('overflow-y', 'hidden');
      }

      if (numberOfCandidates <= 3) {
        $(".notification-candidates-field").css('overflow-y', 'hidden');
      }

      var CandidatesFieldHeight = 0;
      if (!numberOfCandidates) {
        $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
      } else if (numberOfCandidates === 2) {
        CandidatesFieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 2 - 2;
        $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
      } else if (numberOfCandidates === 1) {
        CandidatesFieldHeight = $(".notification-candidates-field").children()[0].offsetHeight - 2;
        $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
      }

      var EventsFieldHeight = 0;
      if (!numberOfEvents) {
        $(".notification-events-field").outerHeight(EventsFieldHeight);
      } else if (numberOfEvents === 2) {
        EventsFieldHeight = $(".notification-events-field").children()[0].offsetHeight * 2 - 2;
        $(".notification-events-field").outerHeight(EventsFieldHeight);
      } else if (numberOfEvents === 1) {
        EventsFieldHeight = $(".notification-events-field").children()[0].offsetHeight - 2;
        $(".notification-events-field").outerHeight(EventsFieldHeight);
      }
      event.preventDefault();
    }
  });

  $(function () {
    $("#selectStatus").dxSelectBox({
      dataSource: ["All", "New", "CV-Accepted", "CV-Rejected", "Accepted"],
      value: data[0],
      onValueChanged: function (data) {
        if (data.value == "All")
          dataGrid.clearFilter();
        else
          dataGrid.filter(["status", "=", data.value]);
      }
    });

    var dataGrid = $("#gridContainerCandidates").dxDataGrid({
      dataSource: data,
      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 10

      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [10, 20, 50],
        showNavigationButtons: true
      },

      columnsAutoWidth: true,
      filterRow: {
        visible: true,
        applyFilter: "auto"
      },

      columnMinWidth: 100,


      headerFilter: {
        visible: false
      },

      columns: [{
        dataField: "photo",
        width: 100,
        allowFiltering: false,
        allowSorting: false,
        cellTemplate: function (container, options) {
          if (!options.value) {
            $("<div>").html("<a href=\"../Training-team-6/id-candidate.html?id=" + options.data['id'] + "\" class=\"candidate-avatar-wrapper\">\n" +
              "                    <img src=\"images/anounymus.png\" alt=\"\" class=\"candidate-avatar\">\n" +
              "                </a>")
              .appendTo(container);
          } else {
            $("<div>").html("<a href=\"../Training-team-6/id-candidate.html?id=" + options.data['id'] + "\" class=\"candidate-avatar-wrapper\">\n" +
              "                    <img src=\"images/" + options.value + ".png\" alt='' class='candidate-avatar'>\n" +
              "                </a>")
              .appendTo(container);
          }
        }
      },
        "name",
        "position",
        "status",
        "salary",
        {
          dataField: "date",
          calculateCellValue: function (rowData) {
            var convertDate = "";
            var now = new Date();
            now = now.getTime() / 1000;
            var dateOfAddUser = (now - rowData.date) / 86400;
            if (dateOfAddUser < 1) convertDate = 'today';
            else if (1 < dateOfAddUser && 2 > dateOfAddUser) convertDate = '1 day later';
            else if (2 < dateOfAddUser && 3 > dateOfAddUser) convertDate = '2 days later';
            else if (3 < dateOfAddUser && 4 > dateOfAddUser) convertDate = '3 days later';
            else if (4 < dateOfAddUser && 5 > dateOfAddUser) convertDate = '4 days later';
            else if (5 < dateOfAddUser && 6 > dateOfAddUser) convertDate = '5 days later';
            else if (6 < dateOfAddUser && 7 > dateOfAddUser) convertDate = '6 days later';
            else if (7 < dateOfAddUser && 14 > dateOfAddUser) convertDate = 'about 1 week';
            else if (14 < dateOfAddUser && 20 > dateOfAddUser) convertDate = 'about 2 weeks';
            else if (20 < dateOfAddUser && 27 > dateOfAddUser) convertDate = 'about 3 weeks';
            else if (27 < dateOfAddUser) convertDate = 'over a month ago';
            return convertDate;
          }
        },
      ]
    }).dxDataGrid('instance');

  });

});
