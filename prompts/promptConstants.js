var colors = require('colors');

module.exports = {
	welcome: '\n' + colors.cyan('°º¤ø,¸¸,ø¤º°`°º¤ø, WELCOME TO AIS JUNIOR ENGINEER TRAINING TRACKER ¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ') + '\n',
	username_tag_prompt: colors.cyan('enter your trello username then enter search tag'),
	boards_header: colors.cyan('Your boards:'), 
	dashboard_header: function (dashBoard) {
		return '\n' + colors.white('username: ') + colors.red(dashBoard.username) + ' ' + colors.white('tag name: ') + colors.red(dashBoard.tag);
	},
	board_choice: '\n'+ colors.cyan('enter the number of the board you want to view:'),
	board_list: function(board, index) {
		return colors.white('  ' + index + ') ' + board.name + ' | ' ) + colors.red(board.lists.length + ' lists');
	},
	board_name: function(dashBoard, board_id) {
		return '\n' + colors.white('Board ' + board_id + ': ' + dashBoard.boards[board_id].name + '\n' + '---------------------------------------');
	},
	color_legend: colors.white('key: ') + colors.green('required') + ' ' + colors.yellow('recommended') + ' ' + colors.magenta('unassigned') + '\n',
	list_name: function(list, index) {
		return colors.white(index + ') ' + list.name.toUpperCase() + ' ----------');
	},
	task_required: function(task, completed, dateCompleted) {
		return '  ' + completed + '  ' + colors.green(task.name) + ' | ' + colors.green(dateCompleted);
	},
	task_recommended: function(task, completed, dateCompleted) {
		return '  ' + completed + '  ' + colors.yellow(task.name) + ' | ' + colors.green(dateCompleted);
	},
	task_unassigned: function(task, completed, dateCompleted) {
		return '  ' + completed + '  ' + colors.magenta(task.name) + ' | ' + colors.green(dateCompleted);
	}
}