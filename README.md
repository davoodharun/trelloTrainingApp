# Trello Training Development Application


## Challenge and Approach
This application is a CLI tool that is meant to analyze a trello user's boards on their account.

This application's main use is to provide a cli tool to analyze a trello users's boards that are designed in a spefic manner focused around a training or development program. The format of a board should be as follows:

	1. All boards should be titled with an identifiable tag name; this is how the applicaiton filters a user's boards
	2. Each list should represent a type of certificate or training topic.
	3. Each card should represent an individual task related to its respective list.
	4. Each card should have ONE checkList item to indicate whether the task is completed or not.
	5. Cards can be labeled with 'Required' or 'Recommended' to indicate required or optional tasks.

## Usage

1. Install node
2. Clone this repo to your local machine
3. Run npm install in your console within the root directory of the cloned repo
4. Log into Trello in your browser and navigate to https://trello.com/app-key
5. Insert key into API_KEY.js
6. Navigate to https://trello.com/1/connect?key=PUBLIC_KEY&name=MyApp&response_type=token&expiration=never after replacing PUBLIC_KEY with the key obtained in step 4.
7. Insert token obtained in step 6 into API_KEY.js
8. Run node index.js inside root directory of this repo
9. When prompted, enter your trello username in your console
10.When prompted, enter a tag name to idenitfy trello boards on your account (this tag should appear in the titles of the boards you are trying to analyze) -- if boards are located, they will be displayed in a list in your console.
11. When prompted, enter the number of the board you want to analyze -- after entering a number, a .csv file will be exported to the reports folder within this repo.

