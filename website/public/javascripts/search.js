function chooseCategory(){
	var cat = $('#choose_cat').val();
	switch(cat){
		case "properties":
			$('#properties').css('display','block');
			$('#methods_in_out').css('display','none');
			$('#methods_datatypes').css('display','none');
			$('#smartComposition_pubsub').css('display','none');
			$('#smartComposition_type').css('display','none');
			break;
		case "methods":
			$('#properties').css('display','none');
			$('#methods_in_out').css('display','block');
			$('#methods_datatypes').css('display','block');
			$('#smartComposition_pubsub').css('display','none');
			$('#smartComposition_type').css('display','none');
			break;
		case "smartComposition":
			$('#properties').css('display','none');
			$('#methods_in_out').css('display','none');
			$('#methods_datatypes').css('display','none');
			$('#smartComposition_pubsub').css('display','block');
			$('#smartComposition_type').css('display','block');
			break;
	}
};
function search_component(){
	var cat = $('#choose_cat').val();
	var params = {}
	switch(cat){
		case "properties":
			var datatype = $('#properties').val();
			params.cat = "properties";
			params.datatype = datatype;
			break;
		case "methods":
			var in_out = $('#methods_in_out').val();
			var datatype = $('#methods_datatypes').val();
			params.cat = "methods";
			params.in_out = in_out;
			params.datatype = datatype;
			break;
		case "smartComposition":
			var pubsub = $('#smartComposition_pubsub').val();
			var datatype = $('#smartComposition_type').val();
			params.cat = "smartComposition";
			params.datatype = datatype;
			params.pubsub = pubsub;
			break;
	}
	$.get('/search/src', params, function(data){
		$('#results').html('<h3>Resultate</h3>');
		if (data == null || data.length === 0 ){
			$('#results').append("<p>Keine Resultate</p>");
		}
		else
		{
			var table = '';
			var check = {}
			check.max = data.length;
			check.count = 0;
			check.next = function (){
				$('#results').append('<table class="keywords">' + table + '</table>');
			};
			check.step = function(){
				this.count++;
				if (this.count == this.max)
					this.next();
			}
			
			data.forEach(function(component){
				table += '<tr>';
				table += '<td><a href="/components/' + component.name + '">' + component.name + '</a></td>';
				table += '<td>'
				if (typeof(component.description) !== 'undefined') table += component.description;
				table += '</td>'
				table += '</tr>';
				check.step();
			});
		}
	});
};