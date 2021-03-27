//Gleda je li korisnik prijavljen te skuplja i slaže djelove za izgled trećeg stuca
import Component from "../baseComponent";
import SpremljaniOglasi from "./spremljeniOglasi";
import DodajOglas from "./dodajOglas";
import Controler from "../modelAndControler";
import NoviOglas from "./noviOglas"


class TreciStupac extends Component {
  constructor() {
    super("div");
    this.rootElement.className="row z-depth-5"
    let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
      sadrzaj.innerHTML = "";
    } else {
        let spremljeniOglasi=new SpremljaniOglasi()
        let dodajOglas=new DodajOglas()
        let noviOglas=new NoviOglas()
      
        this.addChildren([dodajOglas.rootElement, noviOglas.rootElement, spremljeniOglasi.rootElement])
    }
  }

}

module.exports = TreciStupac;
