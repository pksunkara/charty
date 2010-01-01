var errdiv = "charty_error";
var steps  = "charty_steps";
var form   = "chart_form_div";
var div    = "chart_div";
var state = null;

function parsetoint(val)
{
	var p = parseInt(val);
	if(isNaN(p))
		return 0;
	else
		return p;
}

function scpie()
{
	var num =  document.getElementById('cat_num').value;

	if(num !== null)
	{
		var delta = { 'step': 2, 'cat_num': num };
		state.submitDelta(delta);
	}
	else
        {
		document.getElementById(errdiv).innerHTML = "Please fill all fields";
        }
}

function srpie()
{

	var data = "{ cols: [ {id: 'cat', label: 'Category', type: 'string'} ,{id: 'val', label: 'Value', type: 'number'}], rows: [ ";
	
	for(i = 0; i < parsetoint(state.get('cat_num')); i++ )
	{
		data += "{ c: [ {v: '" + document.getElementById('cat'+i).value + "' }, {v: " + parsetoint(document.getElementById('val'+i).value) + " } ] }";
		if(i != parsetoint(state.get('cat_num')) - 1)
                {
			data += ", ";
	        }
        }
	
	data += "] }";
	
	var delta = { json: data , 'step': 3 };
	
	state.submitDelta(delta);
}

function scarea()
{
	var num =  document.getElementById('cat_num').value;
	var line = document.getElementById('cat_line').value;

	if(num !== null)
	{
		var delta = { 'step': 2, 'cat_num': num, 'cat_line': line};
		state.submitDelta(delta);
	}
	else
        {
		document.getElementById(errdiv).innerHTML = "Please fill all fields";
        }
}

function srarea()
{
	var data = "{ cols: [ {id: 'cat', label: 'Category', type: 'string'} ";
	
	for( i =0; i < parsetoint(state.get('cat_line')); i++)
	{
		data += ", {id: 'line"+i+"', label: '"+ document.getElementById('line'+i).value +"', type: 'number'}";
	}
	
	data += "], rows: [ ";
	
	for(i = 0; i < parsetoint(state.get('cat_num')); i++ )
	{
		data += "{ c: [ {v: '" + document.getElementById('cat'+i).value + "' }";
		for( j =0; j < parsetoint(state.get('cat_line')); j++)
		{
			data += ", {v: " + parsetoint(document.getElementById('val'+i+'_'+j).value) + " }";
		}
		data += " ] }";
		if(i != parsetoint(state.get('cat_num')) - 1)
                {
			data += ", ";
	        }		
        }
	
	data += "] }";
	
	var delta = { json: data , 'step': 3 };
	
	state.submitDelta(delta);
}

function charty()
{
	document.getElementById(steps).innerHTML = "";
	document.getElementById(div).innerHTML = "<span>Loading...</span>";

        var jsonstr = state.get('json');
        var json = eval('(' + jsonstr + ')');
        
        var data = new google.visualization.DataTable(json,0.6);

	switch(state.get('type'))
	{
		case 'piechart':
	        	var chart = new google.visualization.PieChart(document.getElementById(div));
	        	document.getElementById(div).innerHTML = "";
        		chart.draw(data, {width: 400, height: 240, is3D: true, title: state.get('title') });	
			break;
		case 'areachart':
	        	var chart = new google.visualization.AreaChart(document.getElementById(div));
	        	document.getElementById(div).innerHTML = "";
        		chart.draw(data, {width: 400, height: 240, legend: 'bottom', title: state.get('title') });
			break;
		case 'linechart':
	        	var chart = new google.visualization.LineChart(document.getElementById(div));
	        	document.getElementById(div).innerHTML = "";
        		chart.draw(data, {width: 400, height: 240, legend: 'bottom', title: state.get('title') });
			break;
		case 'barchart':
	        	var chart = new google.visualization.BarChart(document.getElementById(div));
	        	document.getElementById(div).innerHTML = "";
        		chart.draw(data, {width: 400, height: 240, is3D: true, legend: 'bottom', title: state.get('title') });	
			break;
		case 'columnchart':
	        	var chart = new google.visualization.ColumnChart(document.getElementById(div));
	        	document.getElementById(div).innerHTML = "";
        		chart.draw(data, {width: 400, height: 240, is3D: true, legend: 'bottom', title: state.get('title') });	
			break;	
		default:
			return;
	}
}

function setTitle()
{
	var title = document.getElementById('chart_title').value;
	var type =  document.getElementById('chart_type').value;
	
	if(type !== null && title !== null)
	{
		var delta = { 'title': title , 'type': type , 'step': 1 };
		state.submitDelta(delta);
	}
	else
	{
        	document.getElementById(errdiv).innerHTML = "Please fill all fields";
        }
}

function setColumns()
{
	switch(state.get('type'))
	{
		case 'piechart':
			scpie();
			break;
		case 'areachart': case 'linechart':
			scarea();
			break;
		case 'barchart': case 'columnchart':
			scarea();
			break;
		default:
			return;
	}
}

function setRows()
{
	switch(state.get('type'))
	{
		case 'piechart':
			srpie();
			break;
		case 'areachart': case 'linechart':
			srarea();
			break;
		case 'barchart': case 'columnchart':
			srarea();
			break;			
		default:
			return;
	}	
}

function stepone()
{

	var htmlpc = "<br/><br/><br/><p align='center'><label style='width:15em;'>Number of slices:</label><input type='text' style='width:50px;' id='cat_num' maxlength='2'></p>"+
		     "<p align='center'><input type='button' value='Start Data' onclick='setColumns()'></p>";

	var htmlac = "<br/><br/><br/><p align='center'><label style='width:15em;'>Number of Categories:</label><input type='text' style='width:50px;' id='cat_num' maxlength='2'></p>"+
		     "<p align='center'><label style='width:15em;'>Number of Lines(areas):</label><input type='text' style='width:50px;' id='cat_line' maxlength='2'></p>"+
		     "<p align='center'><input type='button' value='Start Data' onclick='setColumns()'></p>";
		     
	var htmlbc = "<br/><br/><br/><p align='center'><label style='width:15em;'>Number of Categories:</label><input type='text' style='width:50px;' id='cat_num' maxlength='2'></p>"+
		     "<p align='center'><label style='width:15em;'>Number of Bars(Columns):</label><input type='text' style='width:50px;' id='cat_line' maxlength='2'></p>"+
		     "<p align='center'><input type='button' value='Start Data' onclick='setColumns()'></p>";		     

	var html = "";
	
	switch(state.get('type'))
	{
		case 'piechart':
			html = htmlpc;
			break;
		case 'areachart': case 'linechart':
			html = htmlac;
			break;
		case 'barchart': case 'columnchart':
			html = htmlbc;
			break;
		default:
			return;
	}			
				
	document.getElementById(steps).innerHTML = "Step 1 finished";
	document.getElementById(form).innerHTML = html;
}

function steptwo()
{
	var htmlpc = "<br/><br/><br/>";
	for(i = 0; i < parsetoint(state.get('cat_num')); i++ )
	{
		htmlpc += "Slice label "+(i+1)+" : <input type='text' id='cat"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;Value: <input type='text' style='width:75px;' id='val"+i+"'><br>";
	}
	htmlpc += "<p align='center'><input type='button' value='Load Chart' onclick='setRows()'></p>";
	
	var htmlac = "<br/><br/><br/><p>";
	for(i =0; i < parsetoint(state.get('cat_line')); i++)
	{
		htmlac += "Line label "+(i+1)+" : <input type='text' id='line"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	htmlac += "</p><br>"
	for(i =0; i < parsetoint(state.get('cat_num')); i++)
	{
		htmlac += "Category label "+(i+1)+" : <input type='text' id='cat"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;";
		for( j=0; j < parsetoint(state.get('cat_line')); j++)
		{
			htmlac += "Value(L"+(j+1)+"): <input type='text' style='width:75px;' id='val"+i+"_"+j+"'>&nbsp;&nbsp;";
		}
		htmlac += "<br>";
	}
	htmlac += "<p align='center'><input type='button' value='Load Chart' onclick='setRows()'></p>";

	var htmlbc = "<br/><br/><br/><p>";
	for(i =0; i < parsetoint(state.get('cat_line')); i++)
	{
		htmlbc += "Line label "+(i+1)+" : <input type='text' id='line"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	htmlbc += "</p><br>"
	for(i =0; i < parsetoint(state.get('cat_num')); i++)
	{
		htmlbc += "Category label "+(i+1)+" : <input type='text' id='cat"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;";
		for( j=0; j < parsetoint(state.get('cat_line')); j++)
		{
			htmlbc += "Value(B"+(j+1)+"): <input type='text' style='width:75px;' id='val"+i+"_"+j+"'>&nbsp;&nbsp;";
		}
		htmlbc += "<br>";
	}
	htmlbc += "<p align='center'><input type='button' value='Load Chart' onclick='setRows()'></p>";

	var html = "";
	
	switch(state.get('type'))
	{
		case 'piechart':
			html = htmlpc;
			break;
		case 'areachart': case 'linechart':
			html = htmlac;
			break;			
		case 'barchart': case 'columnchart':
			html = htmlbc;
			break;
		default:
			return;
	}			
				
	document.getElementById(steps).innerHTML = "Step 1 finished<br>Step 2 finished";
	document.getElementById(form).style.width = "100%";
	document.getElementById(form).style.textAlign = "center";
	document.getElementById(form).innerHTML = html;
}

function getInfo()
{
        if (!wave.getState()) 
        {
                return;
        }
                
        state = wave.getState();
        
        var step = state.get('step',0);
        
        //document.getElementById('debug').innerHTML = "$"+state.get('json')+"$<br>$"+state.get('type')+"$<br>$"+step+"$";
        
        switch(parsetoint(step))
        {
        	case 1:
        		stepone();
        		break;
        	case 2:
        		steptwo();
        		break;
        	case 3:
        		charty();
        		break;
        	default:
        		return;
        }
        
        gadgets.window.adjustHeight(); 
}

function init() 
{
        if (wave && wave.isInWaveContainer()) 
        {
                wave.setStateCallback(getInfo);
                wave.setParticipantCallback(getInfo);
        }
        
        gadgets.window.adjustHeight(); 
}