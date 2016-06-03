var colors = require('colors');

module.exports = {
	welcome: '\n' + colors.cyan('°º¤ø,¸¸,ø¤º°`°º¤ø, WELCOME TO AIS JUNIOR ENGINEER TRAINING TRACKER ¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ') + '\n',
	username_tag_prompt: colors.yellow('enter your trello username then enter search tag'),
	boards_header: colors.blue('Your boards:'), 
	dashboard_header: function (dashBoard) {
		return '\n' + colors.red(dashBoard.name, 'with tag name', dashBoard.tag);
	},
	board_list: function(board, index) {
		return '  ' + index + ') ' + board.name + ' | ' + colors.cyan(board.lists.length + ' lists');
	},
	board_name: function(dashBoard, board_id) {
		return '\n' + colors.red('Board:', dashBoard.boards[board_id].name + '\n');
	}
}