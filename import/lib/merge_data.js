var async = require('async');

var component = {};
var keywords = [];

var merge = function (html, jsdoc, callback)
{
	component.properties = [];
	component.methods = [];
	
	do_html(html, function(err){
		do_jsdoc(jsdoc);
	});
	
	
	return callback(null, component);
}

var do_html = function (html, callback)
{
	
	component.name = html.is;
	//console.log("HTML IN: " + component.name);
	async.forEachOf(html.properties, function(prop, key, cb){
		var property = {};
		property.name = key;
		if (prop.type)
			property.type = prop.type.name;
		component.properties.push(property);
		return cb(null)
	}, 
	function (err){
		//console.log("HTML OUT: " + component.name);
		return callback(null);
	})
}

var do_jsdoc = function (jsdoc)
{
	//console.log("JSDOC IN: " + component.name);
	async.forEachOf(jsdoc, function(entry, key, cb)
	{
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
								keywords.push(subscription);
								var entry_length = entries[0].length + entries[1].length + 2;
								subscription.description = tag.value.slice(entry_length);
								console.log(subscription.description);
								component.subscription.push(subscription);
								cb(null);
								break;
							case "publish":
								var entries = tag.value.split(' ',2);
								var publish = {};
								publish.name = entries[0];
								publish.type = entries[1];
								keywords.push(publish);
								var entry_length = entries[0].length + entries[1].length + 2;
								publish.description = tag.value.slice(entry_length);
								component.publish.push(publish);
								break;
								cb(null);
						}
					});
				}
			}
			else
			{
				var id = entry.id.split('.');
				if (id[0] === "properties")
				{
					var flag = false;
					async.forEachOf(component.properties, function(value, key, call){
						if (value.name == id[1]){
							flag = true;
							value.desc = entry.description;
							
						}
						call(null);
					}, 
					function(err){
						if (!flag){
							var property = {};
							property.name = id[1];
							property.desc = entry.description;
							if (entry.type)
								property.type = entry.type.names[0];
							else 
								property.type = null;
							component.properties.push(property);
						}
						cb(null);
					})
				}
			}
		}
		else if (entry.kind === "function")
		{
			var method = {};
			var id = entry.id.split('.');
			method.name = id[0];
			method.desc = entry.description;
			if (entry.params)
				method.params = entry.params;
			else 
				method.params = null;	
			if (entry.returns)
				method.returns = entry.returns;
			else 
				method.returns = null;	
			component.methods.push(method);
			return cb(null);
		}
	},
	function (err)
	{
		//console.log("JSDOC OUT: " + component.name);
		return;
	});
}

module.exports = merge;









var parser = function(path, callback) 
{
	stream.on('end', function() {
		var data =  JSON.parse(content);
		var component = {};
		var publish_keys = [];
		var subscribe_keys = [];
		var keywords = [];
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
									keywords.push(subscription);
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
									keywords.push(publish);
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
							property.type = entry.type.names[0];
						else 
							property.type = null;
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
					method.type = entry.type.names[0];
				else 
					method.type = null;	
				component.methods.push(method);
			}
		});
		return callback(null, component, publish_keys, subscribe_keys, keywords);
	});
}

