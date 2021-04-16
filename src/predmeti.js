M.AutoInit();

import PrviStupac from "./components/PrviStupac";
import TreciStupac from "./components/treciStupac";
import PredmetOglasiCard from "./components/predmetOglasiCard";

document.getElementById("stupac1").appendChild(new PrviStupac().rootElement); //Dodaje sadržaj prvom stupcu
let predmet = document.getElementById("predmet-value").getAttribute("value"); //određuje o kojem je predmetu riječ

function myFunction(predmet){
  alert(predmet)
}
let database = firebase.firestore();
database
  .collection("korisnici")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let korisnik = doc.data();
      korisnik.oglasi.forEach((el) => {
        if (el.predmet == predmet) {
          let oglas = new PredmetOglasiCard( //za svaki oglas kojem je property predmet=ime predmeta, kreira katricu
            korisnik.kontakt,
            el.opis,
            korisnik.lokacija,
            el.cijena,
            el.razina,
            el.date,
            el.ocjena.like,
            el.ocjena.dislike,
            el.id,
            korisnik.username
          );
          el.razina == "osnovna škola"
            ? document.getElementById("osnovneSkole").appendChild(oglas.rootElement)
            : document.getElementById("srednjeSkole").appendChild(oglas.rootElement);
          //karticu prema razini ubacuje u div za osnovne ili srednje škole
        }
      });
    });
  });

document.getElementById("stupac3").appendChild(new TreciStupac().rootElement); //dodaje promjenjivi sadržaj trećeg stupca
