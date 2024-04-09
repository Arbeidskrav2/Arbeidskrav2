const baseURL = "https://swapi.dev/api/people"; // API base URL

// Fetching data from API
async function fetchData(Index) {
  try {
    const response = await fetch(`${baseURL}/${Index}`);
    if (!response.ok) {
      throw new Error(`Error status for fetched api: ${response.status}`); // Adds error message with status of API response
    }
    const data = await response.json();
    console.log("Fetched data", data) // Sjekker hvilke data som har blitt hentet fra API
    return data;
  } catch (ex) {
    throw new Error(`Error exeption thrown here: ${ex}`); // Catching exeptions and throwing them as error message
  }
}

// Function for displaying character information
async function characterInformation() {
  try {
    const selectedCharacterIndex = localStorage.getItem("selectedCharacterIndex"); // Getting items from local storage selectedCharacterIndex
    if(selectedCharacterIndex) {
      throw new Error ("No character selected")
    }
    const apiData = await fetchData(selectedCharacterIndex);
    console.log(selectedCharacterIndex);

    const pageStructure = document.getElementById("characterPage");
    const characterData = document.getElementById("characterInfo");
    characterData.innerHTML = `
    <h1> Character Information </h1>
    <p>Name: ${apiData.name}</p>
    <p> Gender: ${apiData.gender}</p>
    <p> Height: ${apiData.height} cm</p>
    <p> Hair color: ${apiData.hair_color}</p>
    <p> Eye color: ${apiData.eye_color}</p>
    <p> Year: ${apiData.birth_year}</p>
    `;
    document.body.style.backgroundColor = "#494D5F";
    pageStructure.style.display = "flex";
    pageStructure.style.backgroundColor = "#D0BDF4";
    pageStructure.style.textAlign = "center";
    pageStructure.style.letterSpacing = "2px";
    pageStructure.style.flexDirection = "column";
    pageStructure.style.justifyContent = "center";
    pageStructure.style.alignItems = "center";
    pageStructure.style.border = "solid";
    pageStructure.style.borderWidth = "1.5px";

    // Creates on click function to personalCollectionBtn
    document.getElementById(
      "personalCollectionBtn"
    ).addEventListener("click", function () {
      location.href = "../personalCollection.html"
    })

    // Creates function for saving character to local storage
    const saveCharacterBtn = document.getElementById("saveBtn");
    saveCharacterBtn.addEventListener("click", function () {
      localStorage.setItem("savedCharacter", JSON.stringify(apiData));
      alert(`${apiData.name} has been saved to list`);
    });
    saveCharacterBtn.style.margin = ".5rem";

    // Function for going back to frontPage again
    const backBtn = document.getElementById("backBtn");
    backBtn.style.position = "fixed";
    backBtn.style.top = "5.3%";
    backBtn.style.left = "30%";
    backBtn.addEventListener("click", function () {
      window.history.back();
    });
  } catch (ex) {
    throw new Error("Her er det feil:", ex);
  }
}
characterInformation();
