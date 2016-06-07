var promptConstants = require('./promptConstants'),
		colors = require('colors/safe'),
		prompt = require('prompt');

module.exports = function(dashBoard) {
	return new Promise (function (fulfill, reject) {
		if (!dashBoard.boards) {
			console.log('boards not found. ');
			process.exit(-1);
		}
		// display dashboard name
		console.log(promptConstants.dashboard_header(dashBoard));
		// display header for list of boards
		console.log(promptConstants.boards_header);
		// log each board in dashBoard.boards
		dashBoard.boards.forEach(function (element, index) {
			console.log(promptConstants.board_list(element, index));
		});
		// user input for board choice
		console.log(promptConstants.board_choice)
		prompt.get(['board_id'], function (err, result) {
			if (err) {
				console.log(err);
				reject(err)
			} else {
				// get actions for each list in dashBoard[result.board_id] -- see dashboard builder sections
				fulfill({dashBoard: dashBoard, choice: result.board_id})
			}
		});
	})	
}