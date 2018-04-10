var data = "";
var url = "/newcand";

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
            $("<div>").html("<a href=\"../id-candidate.html?id=" + options.data['id'] + "\" class=\"candidate-avatar-wrapper\">\n" +
              "                    <img src=\"images/anounymus.png\" alt=\"\" class=\"candidate-avatar\">\n" +
              "                </a>")
              .appendTo(container);
          } else {
            $("<div>").html("<a href=\"../id-candidate.html?id=" + options.data['id'] + "\" class=\"candidate-avatar-wrapper\">\n" +
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
            let convertDate = '';
            // let date = data.date;
            let now = new Date();
            now = now.getTime() / 1000;
            let dateOfAddUser = (now - rowData.date) / 86400;

            if (dateOfAddUser < 1) convertDate = 'today';
            else if (2 < dateOfAddUser && 7 > dateOfAddUser) convertDate = Math.ceil(dateOfAddUser) + ' days later';
            else if (7 < dateOfAddUser && 27 > dateOfAddUser) convertDate = 'about ' + getWeek(dateOfAddUser) + ' week' + getEnding(getWeek(dateOfAddUser)) + ' later';
            else if (27 < dateOfAddUser) convertDate = 'a month ago';

            function getWeek(num) {
              return Math.ceil(num / 7);
            }

            function getEnding(number) {
              return number > 1 ? 's' : '';
            }

            return convertDate;
          }
        }
      ]
    }).dxDataGrid('instance');
  });
});
