M.AutoInit();

import Provjera from "./components/provjera";
import IspisOglasa from "./components/ispisiOglase";
import PrviStupac from "./components/prviStupac";
import Component from "./baseComponent";
import Controler from "./modelAndControler";
let controler = new Controler();

document.getElementById("example1").appendChild(new Provjera().rootElement) 
let database = firebase.firestore();
database
  .collection("korisnici")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let korisnik = doc.data();
      korisnik.oglasi.forEach((el) => {
        if (el.type == "matematika") {
          console.log(el);
          let oglas = new IspisOglasa(
            el.opis,
            el.lokacija,
            el.cijena,
            el.razina,
            el.ocjena.like,
            el.ocjena.dislike
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
