var Spinner = require('cli-spinner').Spinner,
		Dashboard = require('./dashBoard'),
		prompts = require('./prompts')

/* ::: CONTROL LOGIC :::
*	 1). Welcome displayed
*	 2). User is prompted for username and tag to search boards on trello account
*  3). User enters username and tag
*  4). After input, new dashBoard is created with username and tag
*  5). Script calls trello api to get all boards for username with given tag name
*  6). Result of 6 is an array of boards that is assigned to dashBoard.boards
*  7). For each board in dashBoard.boards, script calls trello api to get a board's list
*  8). Result of 7 is assigned to dashBoard.boards[board_id].lists for a given board_id
*  9). For each list in 8 script calls trello api to get a list's tasks.
* 10). Result of 9 is assigned to dashBoard.boards[board_id][list_id].tasks for a given board_id and list_id.
* 11). User is displayed all board names with an index in addition to the respective amount of lists for each board
* 12). User is prompted to input a board_id to view a specific board
* 13). After input, script calls trello api for all the tasks for the board specfied in 12
* 14). Result of 13 is assigned to dashBoard[board_id][list_id][task_id].actions for a given board_id, list_id, and task_id
* 15). Report is generated in folder reports/[time_stamp]/[board_name].csv for board selected in 12 with all lists and tasks and date of completed tasks
* 16). User prompt appears to continue application
*	17). If user enters y, application will go to state 11 -- report will be generated in same folder as 15 with a different board_name
*/




// Loading spinner
var createDashBoard_spinner = new Spinner('creating your dashboard.. %s');
var generateReport_spinner = new Spinner('generating your report.. %s');
createDashBoard_spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
generateReport_spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');

// function to display list of boards
var display = function (dashBoard) {
	// stop spinner
	createDashBoard_spinner.stop(true);
	// display board list to user
	prompts.displayBoardList(dashBoard).then(function (result) {
		// after user input, start spinner
		generateReport_spinner.start();
		// get all actions for tasks (or cards) based off of user input (board chioce)
		result.dashBoard.getActionsForTasks(result.choice).then(function(result){
			// stop spinner
			generateReport_spinner.stop(true);
			// display board to user 
			prompts.displayBoard(result.dashBoard, result.board_index).then(function(result) {
				// if user wants to view board list again and export another report
				if(result.continue) {
					display(result.dashBoard);
				}
			});
		});
	});
}

var init = function () {
	prompts.start().then(function (input) {
		// creat new dashboard with user input
		var dashBoard = new Dashboard(input.username, input.tag);
		// get all relevant boards, lists, and tasks
		createDashBoard_spinner.start();
		dashBoard.seedDashBoard().then(function (dashBoard) {
			// display list of boards -- prompts user for board choice
			display(dashBoard);
		})
	}).catch(function(error) {
		console.log(error)
	});
}();





