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
        if (el.predmet == "fizika") {
          let oglas = new IspisOglasa(
            korisnik.kontakt,
            el.opis,
            `${el.lokacija.županija}, ${el.lokacija.grad}`,
            el.cijena,
            el.razina,
            el.ocjena.like.length,
            el.ocjena.dislike.lengt
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

  document.getElementById("example2").appendChild(new TreciStupac().rootElement) 