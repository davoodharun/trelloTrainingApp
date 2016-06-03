var prompt = require('prompt'),
		cliff = require('cliff'),
		Spinner = require('cli-spinner').Spinner,
		async = require('async'),
		colors = require('colors/safe'),
		Dashboard = require('./dashBoard'),
		trelloController = require('./trelloController'),
		fs = require('fs'),
		promptConstants = require('./promptConstants');
		

		
var spinner = new Spinner('creating your dashboard.. %s');
spinner.setSpinnerString('|/-\\');
console.log(promptConstants.welcome);
prompt.start();
console.log(promptConstants.username_tag_prompt);
prompt.get(['username', 'tag'], function(err, result) {
	if(err) {
		console.log(err);
	} else {
		spinner.start();
		var dashBoard = new Dashboard(result.username, result.tag);
		trelloController.getBoardsForUser(result.username, result.tag).then(function(result) {
			dashBoard.boards = result;
			async.map(dashBoard.boards, trelloController.getListsForBoard, function(error, result) {
				if(error) {
					console.log(error)
				} else {
					dashBoard.boards = result;
					async.each(dashBoard.boards, function(element, callback){
						async.map(element.lists, trelloController.getTasksForList, function(error, result) {
							if(error) {
								return callback(error, null);
							} else {
								element.lists = result;
								return callback(null, element);
							}
						});
					}, function (error) {
						if(error) {
							console.log(error)
						} else {
							spinner.stop(true);
							displayBoardList(dashBoard);
						}
					});
				}
			});
		});
	}
});



var displayBoardList = function(dashBoard) {
	console.log(promptConstants.dashboard_header(dashBoard)) 
	console.log(promptConstants.boards_header)
	dashBoard.boards.forEach(function(element, index){
		var rows = [];
		console.log(promptConstants.board_list(element, index));
	});
	console.log('\n'+ colors.yellow('enter the number of the board you want to view:'))
	prompt.get(['board_id'], function(err, result) {
		if(err) {
			console.log(error)
		} else {
			getActionsForTasks(dashBoard, result.board_id)
		}
	});
}

var getActionsForTasks = function (dashBoard, board_id) {
	async.each(dashBoard.boards[board_id].lists, function (element, callback){
		async.map(element.tasks, trelloController.getActionsForTask, function (error, result) {
			if(error) {
				return callback(error, null);
			} else {
				element.tasks = result;
				// console.log(element.tasks)
				return callback(null, element);
			}
		});
	}, function (error) {
		if(error) {
			console.log(error);
		} else {
			displayBoard(dashBoard, board_id); // dashBoard is in its final state
			var date = Date.now().toString();
			fs.writeFile('reports/' + date +'.txt', JSON.stringify(dashBoard), function (err) {
			  if (err) return console.log(err);
			});
		}
	});
}
var displayBoard = function(dashBoard, board_id) {
	console.log(promptConstants.board_name(dashBoard, board_id));
	console.log('key: ' + colors.green('required'), colors.yellow('recommended'), colors.magenta('unassigned'), colors.white('certifications') + '\n')
	dashBoard.boards[board_id].lists.forEach(function (element, index){
		console.log(index + ') ' + colors.green(element.name.toUpperCase() + ' ----------'))
		var completed = '';
		var dateCompleted = '';
		element.tasks.forEach(function(element){
			if(element.badges.checkItemsChecked === 1) {
				completed = '✔';
				var action = element.actions.filter(function (element) {
					return element.type = 'updateCheckItemStateOnCard';
				});
				dateCompleted = new Date(action[0].date).toLocaleString() // need to fix for IE8
			} else {
				completed = '✖';
				dateCompleted = '';
			}
			var labels = [];
			element.labels.forEach(function (element){
				labels.push(element.name)
			})
			if(labels.indexOf('Required') >= 0) {
				labels.splice(labels.indexOf('Required'), 1)
				console.log('  ' + completed + '  ' + colors.green(element.name) + ' | ' + colors.green(dateCompleted));
			} 
			else if (labels.indexOf('Recommended') >=0) {
				labels.splice(labels.indexOf('Recommended'), 1)
				console.log('  ' + completed + '  ' + colors.yellow(element.name) + ' | ' + colors.green(dateCompleted));
			} else {
				console.log('  ' + completed + '  ' + colors.magenta(element.name) + ' | ' + colors.green(dateCompleted));
			}
		})
		console.log('\n');
	})

	console.log('press y to go back to board list...')
	prompt.get(['continue'], function (err, result) {
		if(err) {
			console.log(error)
		} else {
			if(result.continue === 'y') {
				display(dashBoard)
			}
			
		}
	})
}



