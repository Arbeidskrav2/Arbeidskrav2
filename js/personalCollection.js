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




