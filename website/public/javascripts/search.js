function chooseCategory(){
	var cat = $('#choose_cat').val();
	switch(cat){
		case "properties":
			$('#properties').css('display','block');
			$('#methods_in_out').css('display','none');
			$('#methods_datatypes').css('display','none');
			$('#smartComposition_pubsub').css('display','none');
			$('#smartComposition_type').css('display','none');
			$('#smartComposition_topic').css('display','none');
			break;
		case "methods":
			$('#properties').css('display','none');
			$('#methods_in_out').css('display','block');
			$('#methods_datatypes').css('display','block');
			$('#smartComposition_pubsub').css('display','none');
			$('#smartComposition_type').css('display','none');
			$('#smartComposition_topic').css('display','none');
			break;
		case "smartComposition":
			$('#properties').css('display','none');
			$('#methods_in_out').css('display','none');
			$('#methods_datatypes').css('display','none');
			$('#smartComposition_pubsub').css('display','block');
			break;
	}
	showTopicSearchBox();
};

function showTopicSearchBox(){
	if ($('#smartComposition_pubsub').css('display') == 'block' && $('#smartComposition_pubsub').val() == 'topic') {
			$('#smartComposition_topic').css('display','block');
			$('#smartComposition_type').css('display','none');
	}
	else {
		if ($('#smartComposition_pubsub').css('display') == 'block')
		{
			$('#smartComposition_topic').css('display','none');
			$('#smartComposition_type').css('display','block');
		}
	}
}


function search_component(){
	var cat = $('#choose_cat').val();
	var params = {}
	switch(cat){
		case "properties":
			params.cat = "properties";
			params.datatype = $('#properties').val();
			break;
		case "methods":
			params.cat = "methods";
			params.in_out = $('#methods_in_out').val();
			params.datatype = $('#methods_datatypes').val();
			break;
		case "smartComposition":
			params.cat = "smartComposition";
			params.pubsub = $('#smartComposition_pubsub').val();
			params.datatype = $('#smartComposition_type').val();
			params.search = $('#smartComposition_topic').val();
			break;
	}
	$.get('/search/filter', params, function(data){
		show_results(data);
	});
};

function search_fulltext(){
	var params = {};
	params.search_query = $('#fulltext_search').val();
	$.get('/search/query', params, function(data){
		show_results(data);
	});
};

function show_results(data){
	$('#results').html('<h3>Resultate der letzten Suche</h3>');
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
}