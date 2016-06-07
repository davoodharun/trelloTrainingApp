# Trello Training Development Application


## Challenge and Approach
This application is a CLI tool that is meant to analyze a trello user's boards on their account.

User inputs username and tag name.
A list of boards with titles related to the tag name will be displayed to the user.
A user chooses a board to view.
Based on the users's choice, a report will be generated and saved to the users local machine.
A user can go back and select other boards to generate reports for. 
The report is a .csv file that contains all the tasks (or cards) of a given board with dates of completed checklist items.


This application is still in development.

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

