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
	
	//if the user inputted text
	if(newIng && newIng != "") {
		//create JSON object to be sent to server
		let dataObj = {ingredient: newIng}
		let jsonString = JSON.stringify(dataObj)

		//send to server, uses HTTP requests
		let xhttp = new XMLHttpRequest()
		xhttp.open("POST", "/sendIngredient", true)
		xhttp.setRequestHeader("Content-Type", "application/json")
		xhttp.send(jsonString)
		
		//waits for a response
		xhttp.onreadystatechange = function() {
			
			console.log("A response was heard by the client.")
			
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				
				console.log("The response recieved by the client was successful.")
				
				/*
				let response = JSON.parse(xhttp.responseText)
				let recipes = response.recipes
				
				//for each recipe in response, add it to the HTML
				for (let recipe of recipes) {
					
					//<THIS NEEDS TO BE FIXED>
					recipeDiv.innerHTML = recipeDiv.innerHTML + `
					<div class="recipe">
						<a href="${recipe.f2f_url}" target="_blank">
							<img src=${recipe.image_url} />
							<h2>${recipe.title}</h2>
						</a>
					</div>
					`
				}*/
			}
		}
	}
}

	
