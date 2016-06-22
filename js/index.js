function initialize(form)
		{	
			var rows = Number(form.Rows.value);
			var columns = Number(form.Columns.value);
			var gametable = document.getElementById("gametable");
			var table = document.createElement("TABLE");
    		table.setAttribute("id", "myTable");
    		gametable.appendChild(table);
			var tr = document.createElement("TR");
			for(var i = 1; i <= rows; i++)
			{   table.innerHTML+= "<tr></tr>";
				var row = document.getElementsByTagName("tr")[i-1];
				for (var j = 1; j <= columns; j++) {
				    var td = row.insertCell(0);
					td.setAttribute('id',"cell_"+i+"_"+j);
					td.innerHTML="0";
					td.setAttribute("class", "dead");
				}
			}
		}

		function seed(seedValue)
		{
			seedArray = seedValue[0].value;
			seedJSON = JSON.parse(seedArray);
			for(var i=0; i<seedJSON.length; i++){
				for(row in seedJSON[i]){
				column = seedJSON[i][row];
				var markedRow = document.getElementsByTagName("tr")[Number(row)-1];
				markedRow.children[Number(column)-1].innerHTML = "1";
				markedRow.children[Number(column)-1].setAttribute("class", "alive");
				}	
			}
			
		}

		function iterate()
		{
			var tdTags = document.getElementsByTagName("td");
			for (var i = 0; i < tdTags.length; i++)
			{
					var cell_id = tdTags[i].id;
					var length = tdTags[i].id.split("_");
					var cell_column =  length[2];
					var cell_row = length[1];
					var neighbour_left = document.getElementById("cell_" + Number(cell_row) + "_" + (Number(cell_column) +1) );
					var neighbour_right = document.getElementById("cell_" + Number(cell_row) + "_" + (Number(cell_column) -1) );
					var neighbour_top_left = document.getElementById("cell_" + (Number(cell_row)-1) + "_" + (Number(cell_column) +1) );
					var neighbour_top_right = document.getElementById("cell_" + (Number(cell_row)-1) + "_" + (Number(cell_column) -1) );
					var neighbour_top = document.getElementById("cell_" + (Number(cell_row)-1) + "_" + (Number(cell_column) ) );
					var neighbour_bottom_left = document.getElementById("cell_" + (Number(cell_row)+1) + "_" + (Number(cell_column) +1) );
					var neighbour_bottom_right = document.getElementById("cell_" + (Number(cell_row)+1) + "_" + (Number(cell_column) -1) );
					var neighbour_bottom = document.getElementById("cell_" + (Number(cell_row)+1) + "_" + (Number(cell_column) ) );

					if(neighbour_left){
						neighbour_left = Number(neighbour_left.innerHTML);
					}
					if(neighbour_right){
						neighbour_right = Number(neighbour_right.innerHTML);
					}
					if(neighbour_top_left){
						neighbour_top_left = Number(neighbour_top_left.innerHTML);
					}
					if(neighbour_top_right){
						neighbour_top_right = Number(neighbour_top_right.innerHTML);
					}
					if(neighbour_top){
						neighbour_top = Number(neighbour_top.innerHTML);
					}
					if(neighbour_bottom_left){
						neighbour_bottom_left = Number(neighbour_bottom_left.innerHTML);
					}
					if(neighbour_bottom_right){
						neighbour_bottom_right = Number(neighbour_bottom_right.innerHTML);
					}
					if(neighbour_bottom){
						neighbour_bottom = Number(neighbour_bottom.innerHTML);
					}

					var neighbour_sum = neighbour_left + neighbour_right + neighbour_top_left + neighbour_top_right + neighbour_top + neighbour_bottom_left + neighbour_bottom_right + neighbour_bottom;

					// tdTags[i].innerHTML = 1 means that the cell is currently alive and tdTags[i].innerHTML = 0 means that the cell is currently not alive
					if (tdTags[i].innerHTML == 1 && neighbour_sum < 2 )
					{
						tdTags[i].setAttribute("class", "toBeDead");
					}
					if (tdTags[i].innerHTML == 1 && (neighbour_sum == 2 || neighbour_sum == 3) )
					{
						tdTags[i].setAttribute("class", "toBeAlive");
					}
					if (tdTags[i].innerHTML == 1 && neighbour_sum > 3 )
					{
						tdTags[i].setAttribute("class", "toBeDead");
					}
					if (tdTags[i].innerHTML == 0 && neighbour_sum ==  3 )
					{
						tdTags[i].setAttribute("class", "toBeAlive");
					}
			}

			generateNextGen();	
		}

		function generateNextGen(){
			var toBeAlive = document.getElementsByClassName("toBeAlive");
			var toBeDead = document.getElementsByClassName("toBeDead");
			var limit = toBeAlive.length
			for (var i = 0; i < limit; i++){
				toBeAlive[0].innerHTML="1";
				toBeAlive[0].setAttribute("class", "alive");
			}
			limit = toBeDead.length
			for (i = 0; i < limit; i++){
				toBeDead[0].innerHTML="0";
				toBeDead[0].setAttribute("class", "dead");
			}
		}