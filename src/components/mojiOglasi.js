/* import Component from "../baseComponent";
import IspisOglasa from "./ispisOglasa";
import Controler from "../modelAndControler";
import MojOglas from "./mojOglas";

let controler=new Controler()

class MojiOglasi extends Component {
  constructor() {
    super("div");
    let sadrzaj=document.createElement("div");
  let user = JSON.parse(localStorage["user"]);

  if (user == false) {
    sadrzaj.innerHTML="";
  } else {
    let database = firebase.firestore();

    database.collection("korisnici").where("username", "==", user.username).get()
.then(function(querySnapshot) {
querySnapshot.forEach((doc)=>{
let korisnik = doc.data()
korisnik.oglasi.forEach((el) => {
       let oglas = new MojOglas(
        el.id,
        korisnik.kontakt,
        el.opis,
        el.lokacija,
        el.cijena,
        el.razina,
        el.ocjena.like,
        el.ocjena.dislike,
        korisnik.username
      )
      sadrzaj.appendChild(oglas.rootElement)
  });
});
});
  }
  
  let button=document.createElement("a")
  button.className = "btn modal-trigger col s12 waves-effect waves-light btn";
  button.href="#modal1"
  button.innerHTML="Dodaj oglas"

  document.getElementById("dodajOglas").addEventListener("click", ()=>{this.dodajOglas()})

  controler.addEventListener("dodanJeOglas",
  (event) => {
  this.dodanOglas(event);
})

  this.addChildren([button,sadrzaj])
}




dodajOglas(){
  let grad=document.getElementById("grad");
  let zupanija=document.getElementById("zupanije")
  let opis=document.getElementById("opis");
  let cijena=document.getElementById("cijena");
  let type=document.getElementById("predmet");
  let razina=document.getElementById("razina");
  
  let user = JSON.parse(localStorage["user"]);
  
  

  
  let database = firebase.firestore();
  database
  .collection("korisnici")
  .where("username", "==", user.username)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let korisnik = doc.data();
      let id=Number()
      if(korisnik.oglasi.length==false){
        id=0  
      }else{
        let obj=(korisnik.oglasi[korisnik.oglasi.length-1])
        id=obj.id+1
      }
      let noviOglas={cijena: cijena.value, 
        id: id, 
        lokacija: {grad: grad.value, županija: zupanija.value}, 
        ocjena: {like: Number(0), dislike: Number(0)}, 
        opis: opis.value, 
        predmet: type.value, 
        razina: razina.value
    }
      let niz =korisnik.oglasi
      niz.push(noviOglas)
      database
  .collection("korisnici")
  .doc(doc.id)
  .update({
    oglasi: niz,
  });
  
/*   controler.addOglas( 
    noviOglas
    ); */
    //});
    //location.reload()
 // });





/*   let user = JSON.parse(localStorage["user"]);

  let database = firebase.firestore();
  database.collection("korisnici").where("username", "==", user.username).get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
  let podaci=doc.data()
  database.collection("korisnici").doc(doc.id).update({
    oglasi: {cijena: cijena, lokacija: grad, ocjena: {dislike: 0, like: 0}, opis: opis, razina: razina, type: type}
    })
});
}); */




/* }
}

module.exports = MojiOglasi;
 */ 