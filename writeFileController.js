var fs = require('fs'),
		json2csv = require('json2csv'),
		mkdirp = require('mkdirp'),
		json2csv = require('jsonexport'),
		runCount = 0,
		date = require('./dateCreator');


module.exports = function(dashBoard, board_id, spinner) {
	if(runCount===0) {
		fs.mkdir('./reports/' + date, 0744, function(err) { 
		  if(err) {
		  	console.log(err)
		  } else {
		  	runCount++;
		  }
		});	
	}

	var writeStream = fs.createWriteStream('./reports/' + date + '/' + dashBoard.boards[board_id].name + '.csv');

	var tasks = [];

	dashBoard.boards[board_id].lists.forEach(function(list) {
		list.tasks.forEach(function(task) {
			tasks.push(task);
		});
	});

	json2csv(tasks, {orderHeaders: false}, function(err, csv) {
	  if (err) {
	  	console.log(err);
	  }
	  writeStream.write(csv);
	});

	writeStream.end();
}

