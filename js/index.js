$(document).on('click', 'td', function() { 
	// Get the rows and columns from cell id
	var address = this.id.split("_");

	for (var i = 0; i < Table.cells.length; i++) {
		if(Table.cells[i].address.row == address[0] && Table.cells[i].address.column == address [1] && Table.cells[i].alive == false ){
			Table.cells[i].alive = true;
		}
		else if(Table.cells[i].address.row == address[0] && Table.cells[i].address.column == address [1] && Table.cells[i].alive == true ){
			Table.cells[i].alive = false;
		}
	}

	if(this.className == 'dead'){
		this.setAttribute("class", "alive");
	}
	else{
		this.setAttribute("class", "dead");
	}
});

var Cell = function (isAlive, table, row, column) {
	this.alive = isAlive;
	this.nextGenerationIsAlive = false;
	this.table = table;
	this.address = {
		row: row,
		column: column
	}
} 

Cell.prototype.isDead = function() {
	return !this.isAlive;
};

Cell.prototype.SetAlive = function(isAlive) {
	this.alive = isAlive;
};

Cell.prototype.GetNeighbours = function() {
	// Will return array of my neighbours, from my 'table'

	cells = this.table.cells;
	neighbours = [];
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].address.row == this.address.row-1 && cells[i].address.column == this.address.column){
			var neighbour_top = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row-1 && cells[i].address.column == this.address.column-1){
			var neighbour_top_left = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row-1 && cells[i].address.column == this.address.column+1){
			var neighbour_top_right = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row+1 && cells[i].address.column == this.address.column){
			var neighbour_bottom = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row+1 && cells[i].address.column == this.address.column-1)	{
			var neighbour_bottom_left = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row+1 && cells[i].address.column == this.address.column+1){
			var neighbour_bottom_right = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row && cells[i].address.column == this.address.column-1){
			var neighbour_left = cells[i];
			neighbours.push(cells[i]);
		}
		if (cells[i].address.row == this.address.row && cells[i].address.column == this.address.column+1){
			var neighbour_right = cells[i];
			neighbours.push(cells[i]);
		}
	}
	return neighbours;
};

Cell.prototype.PredictNextGeneration = function() {
	// Will tell If my 'nextGeneration' should be alive or not

	neighbours = this.GetNeighbours();
	var neighbours_sum = 0;
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i].alive)
		neighbours_sum += 1;
	}
	if (this.alive && neighbours_sum < 2 )
	{
		this.nextGenerationIsAlive = false;
	}
	if (this.alive && (neighbours_sum == 2 || neighbours_sum == 3) )
	{
		this.nextGenerationIsAlive = true;
	}
	if (this.alive && neighbours_sum > 3 )
	{
		this.nextGenerationIsAlive = false;
	}
	if (!(this.alive) && neighbours_sum ==  3 )
	{
		this.nextGenerationIsAlive = true;
	}
};

// ---------------------

var Table = {
	cells: [],
	Populate: function(rows, columns) {
		for (var row = 1; row <= rows; row++) {
			for (var column = 1; column <= columns; column++) {
				this.cells.push(new Cell(false, this, row, column));
			}
		}
		this.rows = rows;
		this.columns = columns;
	},
	MoveToNextGeneration: function () {
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i].PredictNextGeneration();
		}
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i].SetAlive(this.cells[i].nextGenerationIsAlive);
		}
	}
}


function generateTable(){
	document.clear();
	var gametable = document.getElementById('gametable');
	// Clear the previous data, table already created
	gametable.innerHTML= "";
	Table.cells=[];
	var form = document.getElementById('Initialization');
	var rows = form.Rows.value;
	var columns = form.Columns.value;
	//Populate the 'Table' object with fresh cells.
	Table.Populate(rows,columns);
	
	var tbl = document.createElement('table');
	gametable.appendChild(tbl);
	for (var i = 0,k=0; i < rows; i++) {
	    var tr = document.createElement('tr');
	    tbl.appendChild(tr);
	// Add the IDs to <td> based on cell address
	    for (var j = 0; j < columns; j++,k++) {
    		var td = document.createElement('td');
	    	var cell_value = document.createTextNode("");
	    	td.appendChild(cell_value);
	    	td.setAttribute("id",Table.cells[k].address.row + "_" + Table.cells[k].address.column);
	    	td.setAttribute("class", "dead");
	    	tr.appendChild(td);
	    }
	}
}

function updateTable(){
	Table.MoveToNextGeneration();
	var form = document.getElementById('Initialization');
	var rows = form.Rows.value;
	var columns = form.Columns.value;
	for (var i = 0,k=0; i < rows; i++) {
		for (var j = 0	; j < columns; j++,k++) {
			td = document.getElementById((i+1)+'_'+(j+1));
			if(Table.cells[k].alive)
				td.setAttribute("class", "alive");
			else
				td.setAttribute("class", "dead");
		}
	}
}
var obj;

function tempFunc(){

obj = new MyCtor(document.getElementById('foo'), "initial");

function MyCtor(element, data) {
	debugger;
    this.data = data;
    this.element = element;
    element.value = data;
    element.addEventListener("change", this);
}

MyCtor.prototype.handleEvent = function(event) {
	debugger
    switch (event.type) {
        case "change": this.change(this.element.value);
    }
};

MyCtor.prototype.change = function(value) {
	debugger
    this.data = value;
    this.element.value = value;
};
};
