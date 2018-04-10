var vacancies;
var url = "/vacancies-grid";
$.getJSON(url, function (data) {


  vacancies = data;
  console.log(vacancies);

});

$(function () {

  var dataGrid = $("#gridContainer").dxDataGrid({
    dataSource: vacancies,
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
    searchPanel: {
      visible: false,
      width: 340,
      placeholder: "Search..."
    },

    columnMinWidth: 100,


    headerFilter: {
      visible: false
    },

    columns: ["position",
      "experience",
      "salary",
      {
        dataField: "date",
        calculateCellValue: function (rowData) {

          let convertDate;
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
      },
      {
        dataField: "View candidates",
        allowFiltering: false,
        allowSorting: false,
        cellTemplate: function (container, options) {
          if (!options.value) {
            $("<div>").html("<a href=\"candidates.html\" class=\"view-candidates-link\">\n" + "View candidates" +
              "</a>")
              .appendTo(container);
          }
        }
      }
    ]
  }).dxDataGrid('instance');

  var applyFilterTypes = [{
    key: "auto",
    name: "Immediately"
  }, {
    key: "onClick",
    name: "On Button Click"
  }];

  var applyFilterModeEditor = $("#useFilterApplyButton").dxSelectBox({
    items: applyFilterTypes,
    value: applyFilterTypes[0].key,
    valueExpr: "key",
    displayExpr: "name",
    onValueChanged: function (data) {
      dataGrid.option("filterRow.applyFilter", data.value);
    }
  }).dxSelectBox("instance");

  $("#filterRow").dxCheckBox({
    text: "Filter Row",
    value: true,
    onValueChanged: function (data) {
      dataGrid.clearFilter();
      dataGrid.option("filterRow.visible", data.value);
      applyFilterModeEditor.option("disabled", !data.value);
    }
  });

  $("#headerFilter").dxCheckBox({
    text: "Header Filter",
    value: true,
    onValueChanged: function (data) {
      dataGrid.clearFilter();
      dataGrid.option("headerFilter.visible", data.value);
    }
  });


});