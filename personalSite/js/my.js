function populateTable() {
	var tbl = document.getElementById('tbl');
	var begin = $('#cost').attr('value');
	var len = $('#length').attr('value');
    var wid = $('#width').attr('value');
    var mult = (parseFloat(len)*parseFloat(wid));

    deleteRows(tbl);

	// get starting number for the table
	if (begin >= 50) begin = begin - 50;
	else begin = 0;

	while (begin % 5 != 0 && begin > 0) {
		begin--;
	} 

	// populate the table
	var row = tbl.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "Total Price";
	cell2.innerHTML = "Price per Square Inch";
	for (i = 1; i < 22; i++) {
		var row = tbl.insertRow(i);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = begin;

		var cell2 = row.insertCell(1);
		var price = parseFloat(begin)/parseFloat(mult);
		cell2.innerHTML = price;

		begin += 5;
	}
}

function deleteRows(tbl) {
	for (var i = document.getElementById("tbl").rows.length; i > 0; i--) {
		document.getElementById("tbl").deleteRow(i-1);
	}
}

