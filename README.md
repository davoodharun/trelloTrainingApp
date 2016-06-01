# Trello Training Development Application


## Challenge and Approach

## Team Members

## Usage

1. install node
2. clone this repo
3. run npm install in the root directory of this repo
4. Log into Trello on the browser of your choice and navigate to https://trello.com/app-key
5. Insert key into API_KEY.js
6. Navigate to https://trello.com/1/connect?key=<PUBLIC_KEY>&name=MyApp&response_type=token&expiration=never after replacing <PUBLIC_KEY> with the key obtained in step 4.
7. Insert token obtained in step 6 into API_KEY.js
8. run node index.js inside root directory of this repo
9. enter trello username -- app will now find relevant information with boards with '(development)' in the title

