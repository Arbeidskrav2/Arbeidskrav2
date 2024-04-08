const baseURL = "https://swapi.dev/api/people";

async function fetchData(id) {
  const completeURL = `${baseURL}/${id}`;
  try {
    const response = await fetch(completeURL);
    if (!response.ok) {
      throw new Error(`Nettside error Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function characterInformation() {
  try {
    const apiData = await fetchData(5);

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

    const personalColletionBtn = document.getElementById(
      "personalCollectionBtn"
    );

    const saveCharacterBtn = document.getElementById("saveBtn");
    saveCharacterBtn.addEventListener("click", function () {
      localStorage.setItem("savedCharacter", JSON.stringify(apiData));
      alert("Character has been saved to collection");
    });
    saveCharacterBtn.style.margin = ".5rem";

    const backBtn = document.getElementById("backBtn");
    backBtn.style.position = "fixed";
    backBtn.style.top = "5.3%";
    backBtn.style.left = "30%";
    backBtn.addEventListener("click", function () {
      window.history.back();
    });
  } catch (error) {
    throw new error("Error:", error);
  }
}
characterInformation();
