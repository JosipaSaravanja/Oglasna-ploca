M.AutoInit();
import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac"; 


import IspisOglasa from "./components/ispisOglasa"


document.getElementById("example1").appendChild(new PrviStupac().rootElement) 


let database = firebase.firestore();
database
  .collection("korisnici")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let korisnik = doc.data();
      korisnik.oglasi.forEach((el) => {
        if (el.predmet == "matematika") {
          let oglas = new IspisOglasa(
            korisnik.kontakt,
            el.opis,
            el.lokacija,
            el.cijena,
            el.razina,
            el.ocjena.length,
            el.ocjena.dislike.length,
            el.id,
            korisnik.username
          );
          if(el.razina == "osnovna škola") {
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

  document.getElementById("treciStupac").appendChild(new TreciStupac().rootElement) 