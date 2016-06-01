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
	var dashBoard = new Dashboard(result.username + 's Dashboard');
	getBoardsForUser(result.username).then(function(result) {
		result.forEach(function(element) {
			var board = new Board(element.name, element.id);
			getListsForBoard(element.id).then(function(result) {
				result.forEach(function(element) {
					var list = new List(element.name, element.id);
					getTasksForList(element.id).then(function(result) {
						result.forEach(function(element) {
							var task = new Task(element.name, element.id);
							list.tasks.push(task);
							board.lists.push(list);
							dashBoard.boards.push(board);
							console.log(dashBoard)
						})
					})
				})
			})
		})
	}).catch(function(err) {
		console.log(err);
	})
});

var getBoardsForUser = function(username) {
	return new Promise(function(fulfill, reject) {
		trello.get('/1/members/' + username + '?boards=all&board_fields=name', function(err, data) {
			if(err) {
				return reject(err);
			} else {
				return fulfill(data.boards.filter(function(element) {
					return element.name.includes('(development)');
				}));
			}
		});
	})
};

var getListsForBoard = function(board_id) {
	return new Promise(function(fulfill, reject) {
		trello.get('/1/boards/' + board_id + '?lists=open&list_fields=name', function(err, data) {
			if(err) {
				return reject(err);
			} else {
				return fulfill(data.lists);
			}
		});
	})
};

var getTasksForList = function(list_id) {
	console.log(list_id)
	return new Promise(function(fulfill, reject) {
		trello.get('/1/lists/' + list_id + '?cards=open&card_fields=name', function(err, data) {
			if(err) {
				console.log('error getting cards')
				return reject(err);
			} else {
				return fulfill(data.cards);
			}
		});
	})
};



// Get two properties from the user: username and email 
// 
// prompt.get(['client', 'email'], function (err, result) {

// });



