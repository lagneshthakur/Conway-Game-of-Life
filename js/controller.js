var conway = angular.module('conway',[]);

conway.controller('gameoflifeController',function($scope,$compile){
	$scope.name = "Lagnesh";
	$scope.Cell = function (isAlive, table, row, column) {
		this.alive = isAlive;
		this.nextGenerationIsAlive = false;
		this.table = table;
		this.address = {
			row: row,
			column: column
		}
	} 

	$scope.Cell.prototype.SetAlive = function(isAlive) {
		this.alive = isAlive;
	};

	$scope.Cell.prototype.GetNeighbours = function() {
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

	$scope.Cell.prototype.PredictNextGeneration = function() {
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

	$scope.Table = {
		cells: [],
		rows:0,
		columns:0,
		Populate: function(rows, columns) {
			for (var row = 1; row <= rows; row++) {
				for (var column = 1; column <= columns; column++) {
					this.cells.push(new $scope.Cell(false, this, row, column));
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
		},
		GetRows: function()
		{
			rowArray = new Array(Number(this.rows));
			for (var i = 0; i < rowArray.length; i++) {
				rowArray[i] = i;
			}
			return rowArray;
		},
		GetColumns:function()
		{
			columnArray = new Array(Number(this.columns));
			for (var i = 0; i < columnArray.length; i++) {
				columnArray[i] = i;
			}
			return columnArray;
		},
		GetCellByRowAndColumn:function(row, column)
		{
			for (var i = 0; i < this.cells.length; i++) {
				if(this.cells[i].address.row == row+1 && this.cells[i].address.column == column+1)
					return this.cells[i];
			}
		}
	};

	//Called from html generate button
	$scope.generateTable = function (){
		var gametable = document.getElementById('gametable');
		// Clear the previous data, table already created
		$scope.Table.cells=[];
		var form = document.getElementById('Initialization');
		var rows = form.Rows.value;
		var columns = form.Columns.value;
		//Populate the '$scope.Table' object with fresh cells.
		$scope.Table.Populate(rows,columns);
	};

	$scope.changestate = function(cell){
		if(cell.alive == true)
			cell.alive = false;
		else
			cell.alive = true;
	}
});
