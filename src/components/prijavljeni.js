//Izgled dprvog stuopca ukoliko je netko prijavljen
import Component from "../baseComponent";
import controler from "../modelAndControler";


class Prijavljeni extends Component {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);

    let img=document.createElement("div")
    img.className="col s12 m6 l12"
    //img.innerHTML=`<img src="images/1.jpg" width="100%" height="100%" />`;
    img.style.textAlign="center"
    
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      controler.user(user);
      location.reload()
    });
    odjava.innerHTML = `Odjavite se <i class="material-icons right">exit_to_app</i>`;
    
    let ime = document.createElement("h5");
    ime.innerHTML = user.username;
/*     let button=document.createElement("a")
    button.className="modal-close waves-effect waves-green btn-flat"
    button.href="dodaj"

    
    button.innerHTML="Uredi profil"
    button.addEventListener("click", () => {
      this.dodajOglas();
    }); */

    this.addChildren([img, ime, odjava]);
}
}

module.exports = Prijavljeni;
