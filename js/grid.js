var orders;
var url = "http://127.0.0.1:8080/vacancies-grid";
$.getJSON(url, function (data) {


    orders = data;


});

$(function () {

    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: orders,
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
            "name",
            "address",
            "city",
            {
                dataField: "mobileNumber",
                caption: "mobileNumber",
                headerFilter: {
                    groupInterval: 10000
                }
            },
            {
                dataField: "homeNumber",
                caption: "homeNumber",
                headerFilter: {
                    groupInterval: 10000
                }
            },
            "email"
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