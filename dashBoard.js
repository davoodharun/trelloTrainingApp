var trelloController = require('./trelloController');
var async = require('async');
var writeFile = require('./writeFileController');

var DashBoard = function(name, tag) {
	this.username = name || '',
	this.tag = tag || '',
	this.boards = []
}

// PROMISE: adds all boards do Dashboard.boards
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

// PROMISE: returns dashBoard with all lists added to all of dashBoard.boards.
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

// PROMISE: returns dashBoard with all tasks added to the lists of for all boards.
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

// PROMISE: returns dashBoard with all actions (completed events) for all tasks for a specific board on dashBoard.boards.
DashBoard.prototype.getActionsForTasks = function(board_index) {
	return new Promise (function (fulfill, reject) {
		async.each(this.boards[board_index].lists, function (element, callback){
			async.map(element.tasks, trelloController.getActionsForTask, function (error, result) {
				if(error) {
					return callback(error, null);
				} else {
					element.tasks = result;
					// console.log(element.tasks)
					return callback(null, element);
				}
			}.bind(this));
		}.bind(this), function (error) {
				if(error) {
					console.log(error);
				} else {
					writeFile(this, board_index);
					fulfill({dashBoard: this, board_index: board_index});
				}
		}.bind(this));
	}.bind(this))
};

// PROMISE: returns dashBoard with all boards, lists, and tasks (cards) for a specific user.
DashBoard.prototype.seedDashBoard = function () {
	return new Promise (function (fulfill, reject) {
		// trello api call
		this.addBoardsForUser().then(function() {
			this.addListsForBoards().then(function() {
				this.addTasksForLists().then(function() {
					fulfill(this);
				}.bind(this));
			}.bind(this));	
		}.bind(this)).catch(function (error){
			console.log('error creating Dashboard...', error);
			reject(error);
		}.bind(this));
	}.bind(this));	
}



module.exports = DashBoard;