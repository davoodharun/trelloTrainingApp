var vows = require('vows'),
		assert = require('assert'),
		apiKey = require('../API_KEY'),
		trelloController = require('../trelloController'),
		// index = require('../index'),
		Trello = require('node-trello'),
		prompt = require('prompt'),
		trello = new Trello(apiKey.trelloClientKey, apiKey.token);

var suite = vows.describe('subject').addBatch({
	'Authorization' : {
		'user has entered credentials': {
			topic: apiKey,
			'has api key': function(topic) {
				assert.notEqual(topic.trelloClientKey, 'YOUR_CLIENT_KEY_HERE')
			},
			'has a api token': function(topic) {
				assert.notEqual(topic.token, 'YOUR_TOKEN_HERE')
			}
		},
		'has valid credentials': {
			topic: 'harundavood1', // username for testing
			'can make get request to api': function(topic) {
				trello.get('/1/members/' + topic + '?boards=all&board_fields=name', function(err, data) {
					if(err) {
						return false;
					} else {
						return true;
					}
				});
			}
		}
	}
}).run();