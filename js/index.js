// html struktur

// Header og section
const heroText = document.getElementById("hero_text");
const characterSide = document.getElementById("character_side");


// Containere til å samle opp karakterer fra api
// Jedi-seksjonen og dens innhold
const jedi = document.createElement("div");
jedi.id = "jedi";
const jediHeadline = document.createElement("h3");
jediHeadline.innerText = "Jedi";
const jediContainer = document.createElement("div");

// Containere til å samle opp karakterer fra api
jediContainer.id = "jedi_container";
jedi.appendChild(jediHeadline);
jedi.appendChild(jediContainer);
characterSide.appendChild(jedi);

// Sith-seksjonen og dens innhold
const sith = document.createElement("div");
sith.id = "sith";
const sithHeadline = document.createElement("h3");
sithHeadline.innerText = "Sith";

// Containere til å samle opp karakterer fra api
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
// Sentrerer og legger til avstand på hero_text
heroText.style.textAlign = "center";
heroText.style.paddingTop ="1rem";

// Styling for karakter-siden
document.body.style.backgroundImage = "linear-gradient(145deg, #ffffff, #000000)";
document.body.style.height = "100vh";
characterSide.style.display = "flex";
characterSide.style.flexWrap = "wrap";
characterSide.style.justifyContent = "space-around";
characterSide.style.alignItems = "center";

// Sjekker om det finnes karakterer i samlingen på side 3, og deretter navigerer til samlingssiden
function personalCollection() {
    const collection = JSON.parse(localStorage.getItem("starWarsCollection") || "[]"); 
    if (collection.length > 0) {
       location.href = "./js/personalCollection.js"; 
    } else {
        alert("For øyeblikket er det ingen karakterer lagret i din StarWars-samling.");
    }
}


//  Fetcher Api. Hente karakterer fra Star Wars API med Async/Await
const baseUrl = "https://swapi.dev/api/people/";
const endPoint = (pageNumber) => `?page=${pageNumber}`;

async function fetchApidata() {
    try {
        const allPages = 9; // Antall sider
        const pageNumbers = [];
        for (let i = 1; i <= allPages; i++) {
            pageNumbers.push(i);
        } // Oppretter en ny array som inneholder tallene fra 1 til antall sider

        const getCharacters = pageNumbers.map(async (pageNumber) => {
            const res = await fetch(`${baseUrl}${endPoint(pageNumber)}`); 
            if (!res.ok) {
                throw new Error(`Noe gikk galt!!!: ${res.status}`);
            }
            const { results } = await res.json(); 
            return results; 
        });

        const allCharacters = (await Promise.all(getCharacters)).flat(); // Venter på at alle løfter fullføres og kombiner resultatene
        organizeAndDisplay(allCharacters);
        console.log(allCharacters);
    } catch (error) {
        console.error("Henting av data gikk galt!!!", error);
    }
}

// Denne funksjonen sorterer karakterene hvor dem hører til.
function organizeAndDisplay(allCharacters) {
    const jediIndex = [0, 4, 13, 1, 2, 12];
    const sithIndex = [3, 15, 19, 42, 20, 21];

    const img = [
        "./assets/characters/luke_skywalker.webp",
        "./assets/characters/Leia_Organa.webp",
        "./assets/characters/han_solo.webp",
        "./assets/characters/C_3PO.webp",
        "./assets/characters/R2_D2.webp",
        "./assets/characters/Chewbacca.webp",
        "./assets/characters/Darth_Vader.webp",
        "./assets/characters/Jabba.webp",
        "./assets/characters/Palpatine.webp",
        "./assets/characters/Maul.webp",
        "./assets/characters/Boba_Fett.webp",
        "./assets/characters/IG_88.webp",
    ];

    jediIndex.forEach((index, i) => {
        const characterName = allCharacters[index].name;
        const characterCard = createAndDisplayElement(
            characterName,
            index,
            img[i]
        );
        jediContainer.appendChild(characterCard);
    });

    sithIndex.forEach((index, i) => {
        const characterName = allCharacters[index].name;

        // [i + jediIndexes.length] korrigerer indeksen for Sith-karakterene i img-arrayen for å matche riktig bilde.
        // Dette er nødvendig fordi Jedi-karakterene kommer først i img-arrayen, så jeg måtte justere indeksen for Sith-karakterene.
        const characterCard = createAndDisplayElement(
            characterName,
            index,
            img[i + jediIndex.length]
        );
        sithContainer.appendChild(characterCard);
    });
}

// // Oppretter og viser html elementer for karakterer
function createAndDisplayElement(name, index, img) {
    const characterCard = document.createElement("div");
    characterCard.className = 'character_card';
    characterCard.innerHTML = `
            <h3>${name}</h3>
            <img src="${img}" alt="${name}"> <br>
            <button onclick="selectCharacter(${index})">I Choose You</button>
    `;
    return characterCard;
}

fetchApidata();

// Lagrer indeksen i crud og localstorage til den valgte karakteren og videresender til side 2
const crudURL = "https://crudcrud.com/api/8b48236bb4ec4d019f0375f897f17268";
const crudEndPoint = "starWarsUploadData";

// Fetcher Api. Post metode. Lagrer både i Crud og LocalStorage
async function selectCharacter(index) {
    localStorage.setItem("selectedCharacter", index);
    try {
        const selectedCharacter = {
            index: index
        };
        const res = await fetch(`${crudURL}/${crudEndPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(selectedCharacter)
        });
        if (!res.ok) {
            throw new Error(`Noe gikk galt her!!!: ${res.status}`);
        }
        localStorage.setItem("selectedCharacter", index); 
        console.log(index);
        location.href = "./characterPage.html"; 
    }   catch (error) {
        console.error(error);
        alert("Karakteren ble ikke lagret!!!");
    }
}