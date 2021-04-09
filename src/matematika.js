M.AutoInit();

import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac"; 
import IspisOglasa from "./components/ispisOglasa";

document.getElementById("stupac1").appendChild(new PrviStupac().rootElement); //Dodaje sadržaj prvom stupcu

let database = firebase.firestore();
database
  .collection("korisnici")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let korisnik = doc.data();
      korisnik.oglasi.forEach((el) => {
        if (el.predmet == "matematika") {
          let oglas = new IspisOglasa( //za svaki oglas kojem je predmet="matematika" kreira katricu
            korisnik.kontakt,
            el.opis,
            korisnik.lokacija,
            el.cijena,
            el.razina,
            el.ocjena.like,
            el.ocjena.dislike,
            el.id,
            korisnik.username
          );
          if(el.razina == "osnovna škola") { //karticu prema razini ubacuje u div za osnovne ili srednje škole
            document
              .getElementById("osnovneSkole")
              .appendChild(oglas.rootElement);
          } else {
            document
              .getElementById("srednjeSkole")
              .appendChild(oglas.rootElement);
          }
        }
      });
    });
  });

  document.getElementById("stupac3").appendChild(new TreciStupac().rootElement) //dodaje promjenjivi sadržaj trećeg stupca