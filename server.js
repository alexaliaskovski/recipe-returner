/*
	Alexandra Liaskovski-Balaba
	101071309
	alexandraliaskovskib@cmail.carleton.ca
	
	Howard Zhang
	101069043
	howardzhang@cmail.carleton.ca
	
	COMP2406 - Assignment #4
	recipes.html
	22nd November 2018, 10pm
	
	PREREQUISITES: 
	install express module using the package.json file with command
		>npm install
	
	Testing: The page can be found at http://localhost:3000/recipes.html in the browser
*/

/*		INITIALIZE		*/	

const express = require('express') 
const logger = require('morgan')			//install
const bodyParser = require('body-parser') 	//install
const app = express()
const API_KEY = 'b6da428dfea0809a81f1421f245c0cc2'
const http = require('http')
const https = require('https')
const JSON = express.json()
const jsonParser = bodyParser.urlencoded({extended: true})
const requestModule = require('request'); 	//install

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/html'

/*		HANDLERS		*/

app.use(logger('dev'))
app.use(bodyParser.json())

//receives request when webpage is reloaded
app.use(function(req, res, next){
  console.log('-------------------------------')
  console.log('req.path: ', req.path)
  console.log('serving:' + __dirname + ROOT_DIR + req.path)
  next()
})
//returns static webpage, favicon, searchicon.png
app.use(express.static(__dirname + ROOT_DIR))

app.get('/recipes.html', function(req,res){
	res.sendFile(__dirname + ROOT_DIR + '/' + 'recipes.html');
});

app.get('/recipes', function(req,res){
	res.sendFile(__dirname + ROOT_DIR + '/' + 'recipes.html');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + ROOT_DIR + '/' + 'recipes.html');
});

//recieves post request for recipe info, req includes ingredients in JSON string
//jsonParse automatically parses JSON string received at request (?)
app.post("/sendIngredient", jsonParser, function(req, res) {
	
	//ingredient(s) the client wants recipes for
	let userIng = req.body.ingredient
	console.log(userIng)
	
	//path information for sending a request to Food2Fork
	const options = {
		host: 'www.food2fork.com',
		path: `/api/search?q=${userIng}&key=${API_KEY}`
	}
	
	//sends a request to Food2Fork for recipe information
	https.request(options, function(apiResponse){
		
		console.log("A request was sent to Food2Fork.\n")
		
		//collects all recipe data into one string
		let recipeData = ''
		apiResponse.on('data', function(chunk) {
			
			console.log("Food2Fork sent a chunk of data.\n")
			
			recipeData += chunk
		})
		
		//does <something> when Food2Fork response is done
		apiResponse.on('end', function() {
			console.log(recipeData);
			console.log("Food2Fork is done sending data.\n")
			//let ingredient = JSON.parse(recipeData).ingredient
			//console.log("ingredient: " + ingredient)
			// *******************
			// need to do something here, can maybe use parse/sendResponse functions, or something else?
			// *******************
			//response.send()
			return res.contentType('application/json').json(recipeData)
		})
	}).end()
})

//right now this function adds to the HTML, which wouldn't work bc its not linked to the html file. Need to send this info to client instead...
function sendResponse(recipeData, res) {
	var page = '<html><head><title>API Example</title></head>' +
		'<body>' +
		'<form method="post">' +
		'Ingredient: <input name="ingredient"><br>' +
		'<input type="submit" value="Get Recipe">' +
		'</form>'
	if (recipeData) {
		let ingredient = JSON.parse(recipeData).ingredient
		page += `<h1>Recipes</h1><p>` + recipeData + '</p>'
	}
	page += '</body></html>'
	res.end(page);
}


/*		SERVER		*/

app.listen(PORT, err => {
  if(err) {console.log(err)}
  else {console.log(`Server listening on port: ${PORT}`)}
})
