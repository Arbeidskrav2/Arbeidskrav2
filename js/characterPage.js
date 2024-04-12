// Styling for body element på siden
document.body.style.backgroundColor = "#494D5F"

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
function cardLocationStyling () {
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
}

// Styling for backBtn
function selectCharacterBtnStyling() {
  let selectCharacterBtn = document.getElementById("backBtn");
    selectCharacterBtn.style.position = "fixed";
    selectCharacterBtn.style.top = "3.4%";
    selectCharacterBtn.style.left = "2%" 
}


// Hovedhenting av data
async function fetchData(index) {
  const baseURL = "https://swapi.dev/api/people"; // API base URL
  try {
    const response = await fetch(`${baseURL}/${index}`);
    if (!response.ok) {
      throw new Error(`Error status for fetched api: ${response.status}`); // Oppretter ny error hvis feil oppstår i fetch
    }
    const data = await response.json(); // Gjør om til JSON format
    console.log("Fetched data", data) // Sjekker hvilke data som har blitt hentet fra API i JSON format
    return data;
  } catch (ex) {
    throw new Error(`Error exeption thrown: ${ex}`); // Tar tak i expections og kaster de som en error
  }
}

// Endrer sithIndex til å tilsvare riktig index(endepunkt) fra API
function adjustSithIndex() {
  const characterDisplayed = localStorage.getItem("selectedCharacter"); // Henter fra localStorage samling med navn selectedCharacter
  let adjustedIndex = parseInt(characterDisplayed); // Konverterer til Integer

  const sithIndexes = [3, 15, 19, 42, 20, 21]; // Lagt til indexer for hver sith
  const changedSithIndexes = sithIndexes.slice(-4); // Lager nytt array med 4 siste elementene

  // Utfører oppgaver basert om sithIndex er inkludert i valgt kort
  if (changedSithIndexes.includes(adjustedIndex)) {
    adjustedIndex += 2; // Hvis adjustedIndex er i det nye arrayet
  } else if (!changedSithIndexes.includes(adjustedIndex)) {
    adjustedIndex += 1; // AdjustedIndex ikke er i nye arrayet
  } else {
    throw new Error("Adjusted sithIndex does'nt include right index");
  } 
  return fetchData(adjustedIndex); // Returner fetch data med den endra indexen
}

// Innhold og funksjonalitet for hvert valgte kort
async function characterCard() {
  try {
    const apiData = await adjustSithIndex(); // Henter alt endret data

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

      // Legger til styling
      cardStyling(); 
      cardLocationStyling();

      // Referering til knapper for alle kort
      backToCharacterSelection();
      saveCharacterBtn(apiData);
      goToCollection();       
  } catch (ex) {
    throw new Error(ex);
}}
characterCard(); // Viser Karakterkortet

// Går til forsiden
function backToCharacterSelection() {
  const selectCharacterBtn = document.getElementById("backBtn");
  selectCharacterBtn.addEventListener("click", function () {
    location.href = "../index.html"; // Henviser til index.html
  });
  selectCharacterBtnStyling();
} 

// Legger til valgt karakter i personlig samling
function saveCharacterBtn (apiData) {
  const saveCharacterBtn = document.getElementById("saveBtn");
  saveCharacterBtn.style.margin = ".5rem";

  // Alt dataen som skal lastet opp i ny localStorage samling
  const uploadData = {
    name: apiData.name,
    gender: apiData.gender,
    height: apiData.height,
    mass: apiData.mass,
    hair_color: apiData.hair_color,
    eye_color: apiData.eye_color,
    birth_year: apiData.birth_year
}
// Lagrer til localStorage
  saveCharacterBtn.addEventListener("click", function () {
    const exsistingCharacter = localStorage.getItem("starWarsCollection");
    const changeToArray = [exsistingCharacter];
    const characterPresent = changeToArray.some(starWarsCharacter => starWarsCharacter.name === apiData.name); // Ser om array har elementer som korresponderer
    
      // Sjekker om karakteren finnes i samlingen 
      if (characterPresent) {
        alert(`${apiData.name} is already in collection`); 
      } else {
        localStorage.setItem("starWarsCollection", JSON.stringify(uploadData)); // Setter verdier til lokalStorage   
        alert(`${apiData.name} has been saved to personal collection`); 
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
