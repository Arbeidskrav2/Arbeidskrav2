const crudApi = "https://crudcrud.com/api/8b48236bb4ec4d019f0375f897f17268";
const crudEndPoint = "starWarsUploadData";

// Laster opp karakterer
window.onload = function () {
  loadCharacter();
};
// Lager style til body element. Style som tilsvarer til starWarsCollection
document.body.style.backgroundImage =
  "linear-gradient(145deg, #ffffff, #000000)";
// Lagrer til local storage de definerte karakterer fra starWarsCollection
function loadCharacter() {
  const existingData = JSON.parse(localStorage.getItem("starWarsCollection"));
  if (existingData) {
    document.getElementById("name").value = existingData.name;
    document.getElementById("gender").value = existingData.gender;
    document.getElementById("height").value = existingData.height;
    document.getElementById("mass").value = existingData.mass;
    document.getElementById("hair_color").value = existingData.hair_color;
    document.getElementById("eye_color").value = existingData.eye_color;
    document.getElementById("birth_year").value = existingData.birth_year;
  }
}

// Oppdaterer karakterer av de definerte
function updateCharacter() {
  const updatedData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    height: document.getElementById("height").value,
    mass: document.getElementById("mass").value,
    hair_color: document.getElementById("hair_color").value,
    eye_color: document.getElementById("eye_color").value,
    birth_year: document.getElementById("birth_year").value,
  };
  localStorage.setItem("starWarsCollection", JSON.stringify(updatedData));
  alert("Character is updated!");

  // Oppdaterer karakterer på serveren
  fetch(crudApi + "updateCharacter", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => alert("Updated:" + data))
    .catch((err) => console.error("Error updating:", err));
}

// Opretter en container og knappen
document.addEventListener("DOMContentLoaded", function () {
  let body = document.body;
  let container = document.createElement("div");
  container.id = "buttonContainer";
  body.appendChild(container);

  // lager knappen
  let button = document.createElement("button");
  button.innerHTML = "Gå til side 1"; // tekst på knappen
  button.onclick = function () {
    // dette er funskjonen som kjører når du trykker knappen
    window.location.href = "/index.html"; // <=== adressen til side 1
  };
  container.appendChild(button); // Legg inn knappen på containeren
});
// Aslan Khatuev

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




