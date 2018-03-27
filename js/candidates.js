var data = "";
var url = "http://127.0.0.1:8080/newcand";

$.getJSON(url, function (candidates) {
  data = candidates;
});

$(document).ready(function () {

  $(function () {
    $("#selectStatus").dxSelectBox({
      dataSource: ["All", "New", "CV-Accepted", "CV-Rejected", "Accepted for interview"],
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
