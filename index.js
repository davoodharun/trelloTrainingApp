var prompt = require('prompt'),
		Trello = require('trello'),
		apiKey = require('./apiKey') || require('./API_KEY'),
		Trello = require("node-trello"),
		trello = new Trello(apiKey.trelloClientKey, apiKey.token),
		cliff = require('cliff'),
		Dashboard = require('./dashBoard'),
		Board = require('./board'),
		List = require('./list'),
		Task = require('./task')



prompt.start();
prompt.get(['username'], function(err, result) {
	var dashBoard = new Dashboard(result.username + 's Dashboard' )
});

var getBoardsForUser = function(username) {
	trello.get('/1/members' + username + '?boards=all&board_fields=name', function(err, data) {
		if(err) {
			return err;
		} else {
			return data;
		}
	})
};

var getListsForBoard = function(board_id) {
	trello.get('/1/boards/' + board_id + 'lists=open&list_fields=name', function(err, data) {
		if(err) {
			return err;
		} else {
			return data;
		}
	})
};

var getTasksForList = function(list_id) {
	trello.get('/1/lists/' + list_id + 'cards=open&card_fields=name', function(err, data) {
		if(err) {
			return err;
		} else {
			return data;
		}
	})
};



// Get two properties from the user: username and email 
// 
// prompt.get(['client', 'email'], function (err, result) {

// });



