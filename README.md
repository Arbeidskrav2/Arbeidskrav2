# Arbeidskrav2

Kravspesifikasjoner
Det vi trenger av ved implementering av løsningen til nettsiden som møter våre forventninger.

Webapplikasjonen skal inneholde minst tre sider: En oversiktsside, en detaljside, og en samlingsside.
Navigasjon mellom sidene skal være intuitiv og brukervennlig.

Funksjonelle Krav:

Side 1: Oversiktsside
Skal liste opp alle karakterer som er hentet hentet fra Star Wars API (SWAPI).
Inkluderer filtre for å sortere eller filtrere listen basert på karakter med navn og bild.
Hver karakter i listen skal være klikkbar og lede brukeren til detaljsiden for det spesifikke elementet. (en knapp med tekst “Velg denne karakteren”)

Side 2: Detaljside
Viser detaljert informasjon om den valgte karakteren.
Tilbyr en funksjon for å legge til det aktuelle elementet i brukerens personlige Star Wars-samling.

Side 3: Samlingsside
Viser en liste over elementer brukeren har lagt til i sin personlige samling på side 2
Tillater brukeren å redigere navnet på sin samling.
Gir mulighet for manipulasjon av listen, som å legge til eller fjerne elementer.

Ikke-funksjonelle Krav:

Ytelse:
Webapplikasjonen skal laste innhold og svare på brukerinteraksjoner innen 2 sekunder for å sikre en god brukeropplevelse.

Skalerbarhet:
Systemet skal være designet for å enkelt kunne utvide med flere funksjoner, som flere filtreringsmuligheter eller støtte for ytterligere kategorier fra SWAPI.

Brukervennlighet:
UI/UX skal være intuitivt og enkelt å navigere for brukere med varierende grad av teknisk kompetanse.
Applikasjonen skal være responsiv og funksjonell på tvers av forskjellige enheter og skjermstørrelser?

Lagring:
Brukerens personlige samling skal lagres slik at data ikke går tapt mellom økter. Dette kan implementeres ved hjelp av lokale lagringsløsninger eller en api som mimiker databasen
