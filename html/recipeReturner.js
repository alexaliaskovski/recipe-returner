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
	
	Testing: The page can be found at http://localhost:3000/recipes.html in the browser
*/

/*
	This function is called when the "Search" button is clicked.
	"Search" button can be found in html file recipes.html
*/
function handleSearch() {
	
	//grab content from text box
	let newIng = document.getElementById("recipeTextField").value
	
	//parse string to remove all spaces
	newIng = newIng.replace(/ /g, "")
	
	//clear text box
	document.getElementById("recipeTextField").value = ""
	document.getElementById("recipes").innerHTML = ""
	
	//if the user inputted text
	if(newIng && newIng != "") {
		//create JSON object to be sent to server
		let dataObj = {ingredient: newIng}
		let jsonString = JSON.stringify(dataObj)

		//send to server, uses HTTP requests
		sendRequest(jsonString)
	}
}

function sendRequest(jsonString) {
	let xhttp = new XMLHttpRequest()
	xhttp.open("POST", "/sendIngredient", true)
	xhttp.setRequestHeader("Content-Type", "application/json")
	xhttp.send(jsonString)
	
	//waits for a response
	xhttp.onreadystatechange = function() {
		
		console.log("A response was heard by the client.")
		
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			
			console.log("The response received by the client was successful.")

			let response = JSON.parse(JSON.parse(xhttp.responseText))
			let recipeSection = document.getElementById("recipes")
			
			//for each recipe in response, add to HTML
			//NOTE: all elements between link div <a></a> are linked to recipe website
			for (let i = 0; i < response.count; i++) {
				let recipe = response.recipes[i]
				console.log(recipe.image_url)
				recipeSection.innerHTML = recipeSection.innerHTML +
				`<div class="flex-item" class = "recipe">
					<a href="${recipe.f2f_url}" target="_blank">
						<img src=${recipe.image_url} class = "recipe_img">
						<p>${recipe.title}</p>
					</a>
				</div>`
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("recipes").innerHTML = ""
	url = window.location.href
	if (url.includes("ingredient")) {
		ingredient = url.split("?")[1]
		jsonObj = {"ingredient" : ingredient.split("=")[1]}
		jsonString = JSON.stringify(jsonObj)
		
		sendRequest(jsonString)
	}
})
