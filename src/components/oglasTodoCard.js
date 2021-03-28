//Kreira kartice koje se nalaze u trecem stupcu s podacima koje je dobio
import Component from "../baseComponent";

class OglasTodoCard extends Component {
  constructor(
    id,
    kontakt,
    opis,
    lokacija,
    cijena,
    razina,
    numberOfLikes,
    numberOfDislikes,
    username
  ) {
    super("div");
    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    this.id = id;
    let row = document.createElement("div");
    row.className = "row";

    let col = document.createElement("div");
    col.className = "col s12";

    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;

    let info = document.createElement("p");
    info.innerHTML = `
            lokacija: ${lokacija.županija}, ${lokacija.grad}<br>
            cijena:  ${cijena} <br>
            razredi: ${razina} <br>
            kontakt: ${kontakt}
        `;

    let ocjena = document.createElement("div");
    ocjena.className = "col s1";

    let like = document.createElement("i");
    like.innerHTML = "thumb_up";
    like.className = "material-icons";
    like.style = "vertical-align :-3px;";

    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "vertical-align :-10px;";

    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = numberOfLikes;

    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = numberOfDislikes;

    let col2 = document.createElement("div");
    col2.className = "col s12";

    let button = document.createElement("a");
    button.className = "col s12 waves-effect waves-light btn";
    button.innerHTML = "OBRIŠI OGLAS";
    button.addEventListener("click", () => {
      this.removeSelf(id, username);
    });
    col2.appendChild(button);

    col.appendChild(opisElement);
    col.appendChild(info);
    col.appendChild(numberOfLikesElement);
    col.appendChild(like);
    col.appendChild(dislike);
    col.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(col2);
    this.addChild(row);
  }

  removeSelf(id, username) {
    let parent = this.rootElement.parentNode;
    parent.removeChild(this.rootElement);
    let database = firebase.firestore();
    
    console.log(username)
    database
      .collection("korisnici")
      .where("username", "==", username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let korisnik = doc.data();
          database
      .collection("korisnici")
      .doc(doc.id)
      .update({
        oglasi: korisnik.oglasi.filter(item => item.id !== id),
      });
      
        });
      });

    /* let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", username).update({
        oglasi: ["portal1", "portal2"]
        })
         */

    /* .get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
let korisnik = doc.data()

korisnik.oglasi = korisnik.oglasi.filter(item => item.id !== id) */

    /*      let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", username).get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
let korisnik = doc.data()

korisnik.oglasi = korisnik.oglasi.filter(item => item.id !== id)
 console.log(korisnik)
});
}); */
  }
}

module.exports = OglasTodoCard;