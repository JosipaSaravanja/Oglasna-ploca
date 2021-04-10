//Kreira kartice koje se nalaze u trecem stupcu s podacima koje je dobio
import Component from "../baseComponent";
import controler from "../modelAndControler";

class OglasTodoCard extends Component {
  constructor(
    id,
    opis,
    cijena,
    predmet,
    razina,
    date,
    likes,
    dislikes,
  ) {
    super("div");
    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    this.id=id;
    let row = document.createElement("div");
    row.className = "row";

    let col = document.createElement("div");
    col.className = "col s12";

    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;

    let info = document.createElement("p");
    info.innerHTML = `
            ${controler.user.lokacija.županija}, ${controler.user.lokacija.grad}<br>
            cijena:  ${cijena} <br>
            predmet: ${predmet} <br>
            razredi: ${razina} <br>
            datum: ${date} <br>
            autor: ${controler.user.username}<br>
            kontakt: ${controler.user.kontakt} 
        `;

    let ocjena = document.createElement("div");
    ocjena.className = "col s1";

    let like = document.createElement("i");
    like.innerHTML = "thumb_down";
    like.className = "material-icons";
    like.style = "cursor: pointer; vertical-align :-10px;";
    //like.addEventListener("click", /* */)

    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_up";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-3px;";

    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = likes.length;

    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = dislikes.length;

    let col2 = document.createElement("div");
    col2.className = "col s12";

    let button = document.createElement("a");
    button.className = "col s12 waves-effect waves-light btn";
    button.innerHTML = "OBRIŠI OGLAS";
    button.addEventListener("click", () => {
      this.removeSelf();
    });
    col2.appendChild(button);

    col.appendChild(opisElement);
    col.appendChild(info);
    col.appendChild(numberOfLikesElement);
    col.appendChild(dislike);
    col.appendChild(like);
    col.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(col2);
    this.addChild(row);//kreira karticu za svaki oglas nakon što su mu poslani podatci
  }

  removeSelf() {
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", controler.user.username)
      .get()
      .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          let korisnik = doc.data();
          database
            .collection("korisnici")
            .doc(doc.id)//pronalazi korisnika 
            .update({
              oglasi: korisnik.oglasi.filter((item) => item.id !== this.id),//filtrira array oglasi tako da ukloni onaj s id-om oglasa koji želimo ukoloniti
            }).then(() => {
              let parent = this.rootElement.parentNode;
              parent.removeChild(this.rootElement);
            });
        });
      });
      
    //kako napraviti da se katrica makne NAKON sto se odrise iz div na zaslonu ne mogu s this. jer mi ga ne pronalazi
  }
}

module.exports = OglasTodoCard;
