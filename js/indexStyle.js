// Stilblokk som en streng.
const css = `
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-weight: bold;
}

h1{
  font-size: 3.5rem;
}

h2{
  color: #b31223;
  font-size: 1.5rem;
}

h3{  
  text-align: center;
}

.character_card h3{
  color: white;
  font-size: 1.3rem;
}

.sith_headline, .jedi_headline{
    font-size: 3rem;
    margin: 1rem 0 1rem 0;
}

.jedi_headline{
  color: #25186f;
}

.sith_headline{
  color: #550707;
}

.container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center
}

.jedi-style, .sith-style {
   width: 800px;
}

.character_card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 325px;
  background-color: grey;
  padding: 1rem;
  border-radius: .5rem;
  transition: transform 0.2s ease-in-out;
  }
  
  .character_card:hover {
    transform: scale(1.05);
    background-color: #b31223;
  }

img{
  margin-top: 1rem;
   width: 180px;
   height: 200px;
}
.character_card button {
  display: none;
    font-size: .9rem;
    font-weight: bold;
    background-color: #000000;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .character_card:hover button {
    display: block; 
    opacity: 1;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}


nav a:hover {
  color: yellow;
}
`;

// Oppretter, setter stilene og legger i head delen av dokumentet
const cssStyling = document.createElement("style");
cssStyling.innerText = css;
document.head.appendChild(cssStyling);