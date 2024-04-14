// Oppretter en ny karakter på serveren
function createCharacter(characterData) {
	fetch(crudApi + "createCharacter", { 
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(characterData),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			alert("Character created: " + JSON.stringify(data));
		})
		.catch((error) => {
			console.error(
				"There has been a problem with your fetch operation:",
				error
			);
			alert("Error creating character. Please try again later.");
		});
}
// slette funksjon 
function deleteCharacter() {
	const nameToDelete = document.getElementById("name").value;

	fetch(crudApi + "deleteCharacter", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: nameToDelete }),
	})
		.then((response) => response.json())
		.then((data) => alert("Character Deleted: " + data))
		.catch((err) => console.error("Error deleting character:", err));
}

document.addEventListener("DOMContentLoaded", function () {
	let container = document.getElementById("buttonContainer");

	// lager knappen og legger til style
	let createButton = document.createElement("button");
	createButton.innerHTML = "Create Character";
	createButton.onclick = createCharacter;
	createButton.style.backgroundColor = "yellow";
	createButton.style.color = "black";
	createButton.style.border = "none";
	createButton.style.padding = "10px 20px";
	createButton.style.cursor = "pointer";
	createButton.style.margin = "20px";
	container.appendChild(createButton);

	// har opprettet slette knapp og legger til style
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete Character";
	deleteButton.onclick = deleteCharacter;
	deleteButton.style.backgroundColor = "red";
	deleteButton.style.color = "white";
	deleteButton.style.border = "none";
	deleteButton.style.padding = "10px 20px";
	deleteButton.style.cursor = "pointer";
	container.appendChild(deleteButton);
});

// styler elementer for knapp og h1
let characterForm = document.getElementById("characterForm");
let h1 = document.querySelector("h1");
let labels = document.querySelectorAll("label");
let inputs = document.querySelectorAll("input");
let button = document.querySelector("button");

// tekst style
characterForm.style.fontFamily = "Arial, sans-serif";
characterForm.style.padding = "20px";
h1.style.color = "blue";
h1.style.marginBottom = "20px";
labels.forEach(function (label) {
	label.style.display = "block";
	label.style.marginBottom = "10px";
});
inputs.forEach(function (input) {
	input.style.width = "50%";
	input.style.padding = "5px";
	input.style.marginBottom = "35px";
});
button.style.backgroundColor = "green";
button.style.color = "white";
button.style.border = "none";
button.style.padding = "10px 20px";
button.style.cursor = "pointer";
