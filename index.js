var prompt = require('prompt'),
		cliff = require('cliff'),
		Spinner = require('cli-spinner').Spinner,
		async = require('async'),
		colors = require('colors/safe'),
		Dashboard = require('./dashBoard'),
		trelloController = require('./trelloController'),
		spinner = new Spinner('creating your dashboard.. %s'),
		promptConstants = require('./promptConstants')

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
								display(dashBoard);
							}
						})
				}
			})
		})
	}
});



var display = function(dashBoard) {
	console.log(promptConstants.dashboard_header(dashBoard)) 
	console.log(promptConstants.boards_header)
	dashBoard.boards.forEach(function(element, index){
		var rows = [];
		console.log(promptConstants.board_list(element, index));
	})
	console.log('\n'+ colors.yellow('enter the number of the board you want to view:'))
	prompt.get(['board_id'], function(err, result) {
		if(err) {
			console.log(error)
		} else {
			displayBoard(dashBoard, result.board_id)
		}
	})
}

var displayBoard = function(dashBoard, board_id) {
	console.log(promptConstants.board_name(dashBoard, board_id));
	dashBoard.boards[board_id].lists.forEach(function(element){
		console.log(element.name)
		var completed = '';
		element.tasks.forEach(function(element){
			if(element.badges.checkItemsChecked === 1) {
				completed = '✔';
			} else {
				completed = '✖';
			}
			var labels = [];
			element.labels.forEach(function(element){
				labels.push(element.name)
			})
			if(labels.indexOf('Required') >= 0) {
				labels.splice(labels.indexOf('Required'), 1)
				console.log(completed + '  ' + colors.green(element.name) + ' | ' + colors.white(labels.join(' , ')));
			} 
			else if (labels.indexOf('Recommended') >=0) {
				labels.splice(labels.indexOf('Recommended'), 1)
				console.log(completed + '  ' + colors.yellow(element.name) + ' | ' + colors.white(labels.join(' , ')));
			} else {
				console.log(completed + '  ' + colors.magenta(element.name) + ' | ' + colors.white(labels.join(' , ')));
			}
		})
	})
}



