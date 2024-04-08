const URL = "https://swapi.dev/api/people/4";

async function fetchData() {
  try {
    const response = await fetch(URL);
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
    const apiData = await fetchData();

    const pageStructure = document.getElementById("characterPage");
    const characterData = document.getElementById("characterInfo");
    characterData.innerHTML = `
    <h1>Name: ${apiData.name}</h1>
    <p> Gender: ${apiData.gender}</p>
    <p> Height: ${apiData.height} cm</p>
    <p> Hair color: ${apiData.hair_color}</p>
    <p> Eye color: ${apiData.eye_color}</p>
    <p> Year: ${apiData.birth_year}</p>
    `;
    pageStructure.style.display = "flex";
    pageStructure.style.flexDirection = "column";
    pageStructure.style.justifyContent = "center";
    pageStructure.style.alignItems = "center";

    const personalColletionBtn = document.getElementById(
      "personalCollectionBtn"
    );
    personalColletionBtn.value = "Here";
  } catch (error) {
    throw new error("Error:", error);
  }
}
characterInformation();
