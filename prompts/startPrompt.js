var promptConstants = require('./promptConstants'),
		colors = require('colors/safe'),
		prompt = require('prompt');
		
// start function -- prompts user for username and tag name
var start = function () {
	return new Promise (function (fulfill, reject) {
		console.log(promptConstants.welcome);
		prompt.start();
		// ask user for username and tag input
		console.log(promptConstants.username_tag_prompt);
		prompt.get(['username', 'tag'], function(err, result) {
			
			if(err) {
				console.log(err);
				reject(err);
			} 
			// start loading spinner
			if(result.username && result.tag) {
				fulfill({username: result.username, tag: result.tag})
			} else {
				console.log(':( sorry try again --- you must enter a username and tag name' + '\n');
				start();
			}
		})
	});
}
module.exports = start;