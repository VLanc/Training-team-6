$(function(){
	var dataGrid = $("#gridContainer").dxDataGrid({
		dataSource: orders,
		columnsAutoWidth: true,
		filterRow: {
			visible: true,
			applyFilter: "auto"
		},
		searchPanel: {
			visible: true,
			width: 240,
			placeholder: "Search..."
		},
		headerFilter: {
			visible: false
		},
		columns: [    "Position","Name","address","city","mobileNumber","homeNumber","email"
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
		onValueChanged: function(data) {
			dataGrid.option("filterRow.applyFilter", data.value);
		}
	}).dxSelectBox("instance");

	$("#filterRow").dxCheckBox({
		text: "Filter Row",
		value: true,
		onValueChanged: function(data) {
			dataGrid.clearFilter();
			dataGrid.option("filterRow.visible", data.value);
			applyFilterModeEditor.option("disabled", !data.value);
		}
	});

	$("#headerFilter").dxCheckBox({
		text: "Header Filter",
		value: true,
		onValueChanged: function(data) {
			dataGrid.clearFilter();
			dataGrid.option("headerFilter.visible", data.value);
		}
	});


});