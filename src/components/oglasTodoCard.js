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
    like.innerHTML = "thumb_up";
    like.className = "material-icons ";
    like.style = "cursor: pointer; vertical-align :-3px;";
    like.addEventListener("click", ()=>{
      let listOfLikes="";
      likes.forEach(el=>listOfLikes+=`${el} <br>`)
      M.toast({html: `${listOfLikes}`});
    });

    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-10px;";
    dislike.addEventListener("click", ()=>{
      let listOfDislikes="";
      dislikes.forEach(el=>listOfDislikes+=`${el} <br>`)
      M.toast({html: `${listOfDislikes}`});
    });

    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = likes.length;

    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = dislikes.length;

    let col2 = document.createElement("div");
    col2.className = "col s12";

    let button = document.createElement("a");
    button.className = "col s12 waves-effect waves-light btn ";
    button.innerHTML = "OBRIŠI OGLAS";
    button.addEventListener("click", () => {
      this.removeSelf();
    });
    
    col.appendChild(opisElement);//opis oglasa
    col.appendChild(info);//informacije o oglasu
    col.appendChild(numberOfLikesElement);//broj like-ova
    col.appendChild(like);//icona like
    col.appendChild(dislike);//icona dislike
    col.appendChild(numberOfDislikesElement);//broj dislike-ova
    col2.appendChild(button);//gumb za brisanje oglasa
    row.appendChild(col);
    row.appendChild(col2);
    this.addChild(row);//kreira karticu za svaki oglas nakon što su mu poslani podatci s dva stupca u row
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
              parent.removeChild(this.rootElement);//briše korisniku oglas s zaslona
            });
        });
      });
  }
}

module.exports = OglasTodoCard;
