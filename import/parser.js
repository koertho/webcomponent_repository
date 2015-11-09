var parse = require('jsdoc-parse');

var parser = function(path, callback) 
{
	var content = '';
	var stream = parse({src: path, html: true});
	stream.on('data', function(chunk) { 
		content += chunk.toString();
	});
	stream.on('error', function(error) {
		return callback(error);
	});
	stream.on('end', function() {
		var data =  JSON.parse(content);
		var component = {};
		var publish_keys = [];
		var subscribe_keys = [];
		component.properties = [];
		component.methods = [];
		data.forEach(function(entry, index) {
			if (entry.kind === "member")
			{
				if (entry.id === "is")
				{
					component.description = entry.description;
					component.author = entry.author;
					component.subscription = [];
					component.publish = [];
					if (entry.customTags){
						entry.customTags.forEach(function(tag){
							switch (tag.tag)
							{
								case "subscribe":
									var entries = tag.value.split(' ',2);
									var subscription = {};
									subscription.name = entries[0];
									subscription.type = entries[1];
									subscribe_keys.push(subscription);
									var entry_length = entries[0].length + entries[1].length + 2;
									subscription.description = tag.value.slice(entry_length);
									console.log(subscription.description);
									component.subscription.push(subscription);
									break;
								case "publish":
									var entries = tag.value.split(' ',2);
									var publish = {};
									publish.name = entries[0];
									publish.type = entries[1];
									publish_keys.push(publish);
									var entry_length = entries[0].length + entries[1].length + 2;
									publish.description = tag.value.slice(entry_length);
									component.publish.push(publish);
									break;
							}
						});
					}
				}
				else
				{
					var id = entry.id.split('.');
					if (id[0] === "properties")
					{
						var property = {};
						property.name = id[1];
						property.desc = entry.description;
						if (entry.type)
							property.datatype = entry.type.names[0];
						else 
							property.datatype = null;
						component.properties.push(property);
					}
				}
			}
			else if (entry.kind === "function")
			{
				var method = {};
				var id = entry.id.split('.');
				method.name = id[0];
				method.desc = entry.description;
				if (entry.type)
					method.datatype = entry.type.names[0];
				else 
					method.datatype = null;	
				component.methods.push(method);
			}
		});
		return callback(null, component, publish_keys, subscribe_keys);
	});
}

module.exports = parser;