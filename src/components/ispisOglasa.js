//Ispisuje čitatelju oglase koji postoje (da pronađe što mu treba), svaki predmet ga posebno poziva s svojim oglasima (nor matematika.js s korisnik.oglasi gdje je predmet ="matematika)")
import Component from "../baseComponent";

class IspisOglasa extends Component {
    constructor(kontakt, opis, lokacija, cijena, razina, numberOfLikes, numberOfDislikes, id, username) {
        super("div");
        this.rootElement.className="card-panel grey lighten-5 z-depth-1"
        
        let row=document.createElement("div")
        row.className="row valign-wrapper"
        
        let col=document.createElement("div")
        col.className="col s11"
        
        let opisElement=document.createElement("p")
        opisElement.className="black-text"
        opisElement.innerHTML=opis
        
        let info=document.createElement("p")
        console.log(lokacija)
        info.innerHTML=`
            lokacija: ${lokacija.županija}, ${lokacija.grad}<br>
            cijena:  ${cijena} <br>
            razredi: ${razina} <br>
            kontakt: ${kontakt}
        `

        let ocjena=document.createElement("div")
        ocjena.className="col s1"

        let like = document.createElement("i");
        like.innerHTML = "thumb_up"
        like.className="material-icons"
        like.style="cursor: pointer; vertical-align :-3px;"
        
        like.addEventListener(
            "click",
            () => {this.like(id, username)}
            );

        let dislike = document.createElement("i");
        dislike.innerHTML = "thumb_down"
        dislike.className="material-icons"
        dislike.style="cursor: pointer; vertical-align :-10px;"
        dislike.addEventListener(
            "click",
            () => {this.dislike(id, username)}
            );

        let numberOfLikesElement=document.createElement("span")
        numberOfLikesElement.innerHTML=numberOfLikes

        let numberOfDislikesElement=document.createElement("span")
        numberOfDislikesElement.innerHTML=numberOfDislikes

        col.appendChild(opisElement)
        col.appendChild(info)
        ocjena.appendChild(numberOfLikesElement)
        ocjena.appendChild(like)
        ocjena.appendChild(dislike)
        ocjena.appendChild(numberOfDislikesElement)
        row.appendChild(col)
        row.appendChild(ocjena)
        this.addChild(row)
        
    }

    like(id, username){/* 
        let user = JSON.parse(localStorage["user"]);
        database
      .collection("korisnici")
      .where("username", "==", username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data();
          korisnik.oglasi.forEach((el) => {
              if(el.id==id){
                  el.ocjene.like.forEach((niz)=>{
                      if(niz.includes(user.username)==true){
                          niz.filter(item=> item!==user.username)
                          console.log(niz)
                        database
                        .collection("korisnici")
                        .doc(korisnik.id)
                        .update({
                          oglasi: korisnik.oglasi,
                        });
                          
                      }
                  })
              }
          });
        });
      }); */
    }

    dislike(){ /* 
      let user = JSON.parse(localStorage["user"]);
      database
    .collection("korisnici")
    .where("username", "==", username)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        let korisnik = doc.data();
        korisnik.oglasi.forEach((el) => {
            if(el.id==id){
                el.ocjene.like.forEach((niz)=>{
                    if(niz.includes(user.username)==true){
                        niz.filter(item=> item!==user.username)
                        console.log(niz)
                      database
                      .collection("korisnici")
                      .doc(korisnik.id)
                      .update({
                        oglasi: korisnik.oglasi,
                      });
                        
                    }
                })
            }
        });
      });
    });  */
        alert("dislike")

    }

}

module.exports = IspisOglasa;