var trelloController = require('./trelloController');
var async = require('async');

var DashBoard = function(name, tag) {
	this.username = name,
	this.tag = tag,
	this.boards = []
}

DashBoard.prototype.addBoardsForUser = function() {
	return new Promise (function (fulfill, reject) {
		trelloController.getBoardsForUser(this.username, this.tag).then(function(result) {
			this.boards = result;

			fulfill(this);
		}.bind(this)).catch(function(error) {
			console.log('error adding boards', error)
			reject(error);
		})
	}.bind(this))
};

DashBoard.prototype.addListsForBoards = function() {
	return new Promise (function (fulfill, reject) {
		async.map(this.boards, trelloController.getListsForBoard, function(error, result) {
			if(error) {
				console.log('error adding lists')
				reject(error);
			}
			this.boards = result;
			fulfill(this);
		}.bind(this));
	}.bind(this));
};

DashBoard.prototype.addTasksForLists = function() {
	return new Promise (function (fulfill, reject) {
		async.each(this.boards, function(element, callback){
			// get tasks (or cards) for each list in this.board[element];
			async.map(element.lists, trelloController.getTasksForList, function(error, result) {
				if(error) {
					return callback(error, null);
				} else {
					// set boards.list equal to array of tasks
					element.lists = result;
					return callback(null, element);
				}
			}.bind(this));
			// error handler for async.each()
		}, function (error) {
			if(error) {
				reject(error);
			}
			// call displayBoardList with the current this -- see display funtions section
			fulfill(this); // dashBoard WITHOUT actions for each task
		}.bind(this));
	}.bind(this))
};



module.exports = DashBoard;