// Html dom struktur og styling. 
const heroText = document.getElementById("hero_text");
const characterSide = document.getElementById("character_side");
const jediContainer = document.getElementById("jedi_container");
const sithContainer = document.getElementById("sith_container");

// Legg til CSS-klasser for jedi-container og sith-container

jediContainer.classList.add("container", "jedi-style");
sithContainer.classList.add("container", "sith-style");

// Sentrer hero_text
heroText.style.textAlign = "center";

// Styling for karakter-siden
characterSide.style.display = "flex";
characterSide.style.justifyContent = "space-around";
characterSide.style.alignItems = "center";

// Lag en stilblokk som en streng
const css = `
body{
   background-color: grey;
}
.container {
   gap: 2rem;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: flex-start;
   justify-content: space-around;
   margin: 0 auto;
   padding: 20px;
   width: 700px;
}

/* Spesifikke stiler for jedi og sith */
.jedi-style {
   width: 700px;
}

.sith-style {
   width: 700px;
}

img{
   width: 200px;
   height: 240px;
}`;


// Opprett et <style> element
const cssStyling = document.createElement("style");

// Sett stilene inn i <style> elementet
cssStyling.innerText = css;

// Legg til <style> elementet i <head> delen av dokumentet
document.head.appendChild(cssStyling);

//  Fetcher Api. Hente karakterer fra Star Wars API. Async await

const baseUrl = "https://swapi.dev/api/people/";
const endPoint = pageNumber => `?page=${pageNumber}`;

async function fetchApidata() {
    try {
        const allPages = 9; // Antall sider
        const pageNumbers = [];
        for (let i = 1; i <= allPages; i++) {
            pageNumbers.push(i);
        } // oppretter en ny array som inneholder tallene fra 1 til antall sider 

        const getCharacters = pageNumbers.map(async pageNumber => {
            const res = await fetch(`${baseUrl}${endPoint(pageNumber)}`);// Henter data fra hver side
            if (!res.ok) {
                throw new Error(`Noe gikk galt!!!: ${res.status}`);
            }
            const { results } = await res.json(); // Hent resultatene fra responsen
            return results; // Returner resultatene fra denne siden
        });

        const allCharacters = (await Promise.all(getCharacters)).flat(); // Vent på at alle løfter fullføres og kombiner resultatene
        charactersBySide(allCharacters); // Kall charactersBySide funksjonen med allCharacters som argument
        console.log(allCharacters);
    } catch (error) {
        console.error("Henting av data gikk galt!!!", error);
    }
};

// Sorterer karakterene på den lyse og mørke siden etter navnene
function charactersBySide(allCharacters) {
    const jediIndexes = [0, 1, 2, 4, 9, 13];
    const sithIndexes = [3, 15, 19, 42, 20, 21];

    const img = [
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/C_3PO.webp",
        "./assets/characters/R2_D2.webp",
        "./assets/characters/Leia_Organa.webp",
        "./assets/characters/Obi_wan.webp",
        "./assets/characters/han_solo.webp",
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/luke_skywalker.webp",
    ];

    jediIndexes.forEach((index, i) => {
        const characterName = allCharacters[index].name;
        const characterElement = createCharacterElement(characterName, index, img[i]);
        jediContainer.appendChild(characterElement);
    });

    sithIndexes.forEach((index, i) => {
        const characterName = allCharacters[index].name;
        const characterElement = createCharacterElement(characterName, index, img[i + jediIndexes.length]);
        sithContainer.appendChild(characterElement);
    });
}

function createCharacterElement(name, index, img) {
    const characterElement = document.createElement("div");
    characterElement.innerHTML = `
        <div>
            <h3>${name}</h3>
            <img src="${img}" alt="${name}"> <br>
            <button onclick="characterSelection(${index})">Velg denne karakteren</button>
        </div>
    `;
    return characterElement;
}


// Kall fetchApidata for å hente data
fetchApidata(); 

// Lagrer og viser lagrede info på side 2
function characterSelection(index) {
    localStorage.setItem("selectedCharacterIndex", index);
    location.href = "Simen.html";
}