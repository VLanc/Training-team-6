var orders;
jQuery.getJSON('data.json', {}, function (json) {
    orders = json;
});
$(function () {
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: orders,
        remoteOperations: {
            sorting: true,
            paging: true
        },
        paging: {
            pageSize: 13

        },
        pager: {
            showPageSizeSelector: false,
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