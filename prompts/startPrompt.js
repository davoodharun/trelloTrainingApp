var promptConstants = require('./promptConstants'),
		colors = require('colors/safe'),
		prompt = require('prompt');
module.exports = function () {
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
				reject(':( sorry try again --- you must enter a username and tag name');
				start();
			}
		})
		
	});
}