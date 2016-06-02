var apiKey = require('./apiKey') || require('./API_KEY'),
		Trello = require("node-trello"),
		trello = new Trello(apiKey.trelloClientKey, apiKey.token)

module.exports = {

	getBoardsForUser: function(username, tag) {
		return new Promise(function(fulfill, reject) {
			trello.get('/1/members/' + username + '?boards=all&board_fields=name', function(err, data) {
				if(err) {
					return reject(err);
				} else {
					return fulfill(data.boards.filter(function(element) {
						return element.name.includes(tag);
					}));
				}
			});
		})
	},

	getListsForBoard: function(board, callback) {
		trello.get('/1/boards/' + board.id + '?lists=open&list_fields=name', function(err, data) {
			if(err) {
				return callback(err, null);
			} else {
				board.lists = data.lists
				return callback(null, board);
			}
		});
	},

	getTasksForList: function(list, callback) {
		trello.get('/1/lists/' + list.id + '?cards=open&card_fields=all', function(err, data) {
			if(err) {
				return callback(err, null);
			} else {
				list.tasks = data.cards
				return callback(null, list);
			}
		});

	}
}