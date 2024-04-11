document.body.style.backgroundColor = "#494D5F"; // Legge til farge bakgrunnen av siden

const baseURL = "https://swapi.dev/api/people"; // API base URL

// Fetching data from API
async function fetchData(index) {
  try {
    const response = await fetch(`${baseURL}/${index}`);
    if (!response.ok) {
      throw new Error(`Error status for fetched api: ${response.status}`); // Oppretter ny error hvis feil oppstår
    }
    const data = await response.json();
    console.log("Fetched data", data) // Sjekker hvilke data som har blitt hentet fra API
    return data;
  } catch (ex) {
    throw new Error(`Error exeption thrown: ${ex}`); // Tar tak i expections og kaster de som en error
  }
}
// Styling for elementene i valgt kort
function cardStyling() {
  let cardStyles = document.getElementById("characterCard");
    cardStyles.style.display = "flex";
    cardStyles.style.flexDirection = "column";
    cardStyles.style.justifyContent = "center";
    cardStyles.style.alignItems = "center";
    cardStyles.style.backgroundColor = "#D0BDF4";
    cardStyles.style.padding = "1rem";
    
    cardStyles.style.textAlign = "center";
    cardStyles.style.letterSpacing = "2px";

    cardStyles.style.border = "solid";
    cardStyles.style.borderWidth = "1.5px";
}

// Struktur på selve kortet
let cardPosition = document.getElementById("characterCard");
  cardPosition.style.display = "flex";
  cardPosition.style.flexDirection = "column";
  cardPosition.style.marginLeft = "auto";
  cardPosition.style.marginRight = "auto";

  cardPosition.style.position = "fixed";
  cardPosition.style.top = "50vh";
  cardPosition.style.left = "12vw"
  cardPosition.style.transform = "translateY(-50%)";

  cardPosition.style.width = "70vw"
  cardPosition.style.height = "70vh"


// Styling for backBtn
let backBtnStyling = document.getElementById("backBtn");
    backBtnStyling.style.position = "fixed";
    backBtnStyling.style.top = "3.4%";
    backBtnStyling.style.left = "2%"

// Endrer sithIndex til å tilsvare riktig index(endepunkt) fra API
async function adjustSithIndex() {
  const selectedCharacterIndex = localStorage.getItem("selectedCharacterIndex"); // Getting items from local storage selectedCharacterIndex
  let adjustedIndex = parseInt(selectedCharacterIndex); // Konverterer til Integer

  const sithIndex = [3, 15, 19, 42, 20, 21]; // Lagt til indexer for hver sith
  const adjustedSithIndex = sithIndex.slice(-4); // Lager nytt array med 4 siste elementene

  if (adjustedSithIndex.includes(adjustedIndex)) {
    adjustedIndex += 2; 
  } else if (!adjustedSithIndex.includes(adjustedIndex)) {
    adjustedIndex += 1;
  } else {
    throw new Error("Adjusted sithIndex does'nt include adjusted index")
  }
  return fetchData(adjustedIndex)
}

// Innhold og funksjonalitet for hvert valgte kort
async function characterCard() {
  try {
    const apiData = await adjustSithIndex();
    const characterKey = `${apiData.name}` // Gir en nøkkel for lokalStorage

      const characterData = document.getElementById("characterInfo");
      characterData.innerHTML = `
      <h1> Character Information </h1>  
      <p>Name: ${apiData.name}</p>
      <p> Gender: ${apiData.gender}</p>
      <p> Height: ${apiData.height} cm</p>
      <p> Mass: ${apiData.mass}</p>
      <p> Hair color: ${apiData.hair_color}</p>
      <p> Eye color: ${apiData.eye_color}</p>
      <p> Year: ${apiData.birth_year}</p>
      `;
      cardStyling();

      // Referering til knapper for alle kort
      backToFrontPage(apiData);
      saveCharacterBtn(apiData, characterKey);
      goToCollection(apiData);       
  } catch (ex) {
    throw new Error(ex);
}}
characterCard(); // Viser hovedfunksjonen

// Går til forsiden
function backToFrontPage() {
  const backBtn = document.getElementById("backBtn");
  backBtn.addEventListener("click", function () {
    location.href = "../index.html"
  });
} 

// Legger til valgt karakter i localStorage
function saveCharacterBtn (apiData, characterKey) {
  const saveCharacterBtn = document.getElementById("saveBtn");
  saveCharacterBtn.style.margin = ".5rem";
  const existingData = localStorage.getItem(characterKey) // Sjekker existerende nøkkel i localStorage
  saveCharacterBtn.addEventListener("click", function () {
    if (existingData === null) {
      localStorage.setItem(characterKey, JSON.stringify(apiData)); // Setter verdier til lokalStorage
      alert(`${apiData.name} has been saved to personal collection`);
    } else {
       alert(`${apiData.name} is already in your collection`)
    }
  });
}

// Går til personlige samlingen
function goToCollection() {
  let personalCollectionBtn = document.getElementById(
    "personalCollectionBtn"
  );
  personalCollectionBtn.addEventListener("click", function () {
    location.href = "../personalCollection.html"
  });
}   

