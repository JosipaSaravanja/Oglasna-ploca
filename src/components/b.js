import Component from "../baseComponent";
import Controler from "../modelAndControler";
let controler = new Controler();
import PrijavaOkvir from "./prijavaOkvir";

class ProfilOkvir extends Component {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);

    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.innerHTML = "Odjavite se";
    odjava.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      controler.user(user);
      location.reload()
      
    });

    let ime = document.createElement("h5");
    ime.innerHTML = user.username;

    this.addChildren([ime, odjava]);
}
}

module.exports = ProfilOkvir;