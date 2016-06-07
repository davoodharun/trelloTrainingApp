var promptConstants = require('./promptConstants'),
		prompt = require('prompt'),
		colors = require('colors/safe');
// takes a dashBoard object and a board number (index of dashBoard.boards)
module.exports = function(dashBoard, board_id) {
	return new Promise (function (fulfill, reject) {
		console.log('here', dashBoard, board_id)
		// console board header
		console.log(promptConstants.board_name(dashBoard, board_id));
		// console color legend
		console.log(promptConstants.color_legend)
		// for list in board
		dashBoard.boards[board_id].lists.forEach(function (element, index){
			// log list name
			console.log(promptConstants.list_name(element, index))
			// closure variables to track completed tasks and completion date
			var completed = '';
			var dateCompleted = '';
			// for each task in lists
			element.tasks.forEach(function(element){
				// check if task is complete
				if(element.badges.checkItemsChecked === 1) {
					// if task in complete, assign completed to check
					completed = '✔';
					// find date of completiong for specific action
					var action = element.actions.filter(function (element) {
						return element.type = 'updateCheckItemStateOnCard';
					});
					// set dateCompleted closure variable
					dateCompleted = new Date(action[0].date).toLocaleString() // TODO: fix for IE8
				} else {
					// if task is not complete, set complete to x
					completed = '✖';
					// no completion date
					dateCompleted = '';
				}

				// map label name to each item in element.labels
				element.labels = element.labels.map(function (element){
					return element.name;
				});

				// check if task is required (has required label)
				if(element.labels.indexOf('Required') >= 0) {
					// remove 'required' label from array
					element.labels.splice(element.labels.indexOf('Required'), 1)
					// log task with green color
					console.log(promptConstants.task_required(element, completed, dateCompleted));
				} 
				// check if task is optional or recommended
				else if (element.labels.indexOf('Recommended') >=0) {
					// remove 'recommended' label from array
					element.labels.splice(element.labels.indexOf('Recommended'), 1)
					// log task with yellow color
					console.log(promptConstants.task_recommended(element, completed, dateCompleted));
				} else {
					// if unassigned (neither required or recommended), log task with magenta color
					console.log(promptConstants.task_unassigned(element, completed, dateCompleted));
				}
			});
			console.log('\n');
		});

		console.log('exported .csv file to reports folder');
		console.log(colors.cyan('press y to go back to board list...'));

		// recursive input to continue or exit
		prompt.get(['continue'], function (err, result) {
			if(err) {
				console.log(err);
				reject(err);
			} else {
				if(result.continue === 'y') {
					fulfill({dashBoard: dashBoard, continue:true});
				} else {
					process.exit(-1);
				}
			}
		})
	})
	
};