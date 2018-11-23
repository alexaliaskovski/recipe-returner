/*

	Alexandra Liaskovski-Balaba
	101071309
	alexandraliaskovskib@cmail.carleton.ca
	
	Howard Zhang
	101069043
	howardzhang@cmail.carleton.ca
	
	COMP2406 - Assignment #4
	README
	23th November 2018, 10pm
	
	Testing: The app can be found at the following addresses:
	- http://localhost:3000/recipes.html
        - http://localhost:3000/recipes
        - http://localhost:3000/
        - http://localhost:3000
	
*/

Files:				
- server.js
- package.json
- html/recipes.html
- html/recipeReturner.js
- html/searchicon.png
				
Node Version:	
v8.11.4

OS:		
Windows 10

Required Code/Packages:	
- node.js
- express.js
- morgan
- body-parser

To install node:
	1. Go to nodejs.org to download node (for windows users, 8.12.0 LTS should be used)
	2. Execute the installing when downloaded from browser
	3. After installation, restart the computer
	4. To test to make sure node was installed, open the command prompt, and type "node -v" (this will display the version number if installed correctly)

To install express:
	1. Open your command prompt.
	2. Using the command prompt, navigate to the folder in which your source code is located (in this case, navigate to where server.js is located)
	3. Enter "npm install socketio --save", this will download the required code used to run the program.
        
To install other packages:
        *The packages that are needed are all noted in the package.json file supplied with the program.*
        1. If the program is contained in a compressed format (.zip... etc.), extract the program into your preferred directory.
        2. Open your command prompt.
        3. Navigate to the folder in which you have extracted the files.
        4. In the command line, enter "npm install". This will download and install any required packages, based on the information provided in the package.json file.
				

Launch:			
	1. In the command prompt, navigate to the directory containing the server.js file (using cd command)
	2. In the command prompt, type "node server.js" - this will create the server
	3. In the chrome web browser, navigate to any of the following:
            - http://localhost:3000/recipes.html
            - http://localhost:3000/recipes
            - http://localhost:3000/
            - http://localhost:3000


Execution:
			
1. Navigate to any of the above URLs to access the webpage. You can provide a query string by entering: "?ingredient=..." after the main url. This will search for recipes containing the ingredients that were provided. IF there are multiple ingredients that are needed, separate each one using a comma. For example: you can test this feature using "localhost:3000/?ingredient=Basil,Dill".
2. Enter in ingredients in the textbox, while also separating multiple ingredients using commas. Press the "Submit" button once finished. The app will then request recipes from the API using the provided ingredients, and return them in the form of clickable pictures and titles below the textbox.
3. Repeat as needed. The boxes below will refill with new recipes each time.

Issues:
- None!
