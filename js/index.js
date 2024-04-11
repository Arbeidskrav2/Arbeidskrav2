// html struktur
const heroText = document.getElementById("hero_text");
const characterSide = document.getElementById("character_side");


// Laget containere til å samle opp karakterer fra api
// Jedi-seksjonen og dens innhold
const jedi = document.createElement("div");
jedi.id = "jedi";
const jediHeadline = document.createElement("h3");
jediHeadline.textContent = "Jedi";
const jediContainer = document.createElement("div");

// Laget containere til å samle opp karakterer fra api
jediContainer.id = "jedi_container";
jedi.appendChild(jediHeadline);
jedi.appendChild(jediContainer);
characterSide.appendChild(jedi);

// Sith-seksjonen og dens innhold
const sith = document.createElement("div");
sith.id = "sith";
const sithHeadline = document.createElement("h3");
sithHeadline.textContent = "Sith";

// Laget containere til å samle opp karakterer fra api
const sithContainer = document.createElement("div");
sithContainer.id = "sith_container";
sith.appendChild(sithHeadline);
sith.appendChild(sithContainer);
characterSide.appendChild(sith);

// Legger til klasser 
jediContainer.classList.add("container", "jedi-style");
sithContainer.classList.add("container", "sith-style");
sithHeadline.classList.add("sith_headline");
jediHeadline.classList.add("jedi_headline");



// Styling
// Sentrer hero_text
heroText.style.textAlign = "center";

// Styling for karakter-siden
document.body.style.backgroundColor = "#494D5F";
characterSide.style.display = "flex";
characterSide.style.flexWrap = "wrap";
characterSide.style.justifyContent = "space-around";
characterSide.style.alignItems = "center";

// Stilblokk som en streng.
const css = `
h3{
    text-align: center;
    font-weight: bold;
    padding: ;
    color: white;
}

.sith_headline, .jedi_headline{
    font-size: 3rem;
}

.container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center
}

.jedi-style, .sith-style {
   width: 700px;
}


img{
   width: 180px;
   height: 200px;
}`;

// Oppretter styling element
const cssStyling = document.createElement("style");

// Setter stilene inn i elementet
cssStyling.innerText = css;

// Legger til styling elementet i <head> delen av dokumentet
document.head.appendChild(cssStyling);

// Sjekker om det finnes karakterer i samlingen, og deretter naviger til samlingssiden
function personalCollection() {
    const collection = JSON.parse(localStorage.getItem("characterKey") || "[]"); //Bytt til den faktiske navnen til samlingen som simen kalte den
    if (collection.length > 0) {
       location.href = "./js/personalCollection.js"; 
    } else {
        alert("For øyeblikket er det ingen karakterer lagret i din StarWars-samling.");
    }
}


//  Fetcher Api. Hente karakterer fra Star Wars API. Async await
const baseUrl = "https://swapi.dev/api/people/";
const endPoint = (pageNumber) => `?page=${pageNumber}`;

async function fetchApidata() {
    try {
        const allPages = 9; // Antall sider
        const pageNumbers = [];
        for (let i = 1; i <= allPages; i++) {
            pageNumbers.push(i);
        } // oppretter en ny array som inneholder tallene fra 1 til antall sider

        const getCharacters = pageNumbers.map(async (pageNumber) => {
            const res = await fetch(`${baseUrl}${endPoint(pageNumber)}`); // Henter data fra hver side
            if (!res.ok) {
                throw new Error(`Noe gikk galt!!!: ${res.status}`);
            }
            const { results } = await res.json(); // Hent resultatene fra responsen
            return results; // Returner resultatene fra denne siden
        });

        const allCharacters = (await Promise.all(getCharacters)).flat(); // Venter på at alle løfter fullføres og kombiner resultatene
        organizeAndDisplay(allCharacters); // Kall organizeAndDisplay funksjonen med allCharacters som argument
        console.log(allCharacters);
    } catch (error) {
        console.error("Henting av data gikk galt!!!", error);
    }
}

// Denne funksjonen sorterer karakterene hvor dem hører til.
// Den tar inn en liste over alle karakterer som argument.
function organizeAndDisplay(allCharacters) {
    const jediIndex = [0, 1, 2, 4, 9, 13];
    const sithIndex = [3, 15, 19, 42, 20, 21];

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

    jediIndex.forEach((index, i) => {
        const characterName = allCharacters[index].name;
        const characterElement = createAndDisplayElement(
            characterName,
            index,
            img[i]
        );
        jediContainer.appendChild(characterElement);
    });

    sithIndex.forEach((index, i) => {
        const characterName = allCharacters[index].name;

        // [i + jediIndexes.length] korrigerer indeksen for Sith-karakterene i img-arrayen for å matche riktig bilde.
        // Dette er nødvendig fordi Jedi-karakterene kommer først i img-arrayen, så jeg måtte justere indeksen for Sith-karakterene.
        const characterElement = createAndDisplayElement(
            characterName,
            index,
            img[i + jediIndex.length]
        );
        sithContainer.appendChild(characterElement);
    });
}

// // Oppretter og viser html elementer for karakterer
function createAndDisplayElement(name, index, img) {
    const characterElement = document.createElement("div");
    characterElement.innerHTML = `
        <div>
            <h3>${name}</h3>
            <img src="${img}" alt="${name}"> <br>
            <button onclick="selectCharacter(${index})">Velg denne karakteren</button>
        </div>
    `;
    return characterElement;
}

// Kaller fetchApidata for å hente data
fetchApidata();

// // Lagrer indeksen til den valgte karakteren og videresender til Simens side
function selectCharacter(index) {
    localStorage.setItem("selectedCharacter", index);
    location.href = "./characterPage.html"; 
}
