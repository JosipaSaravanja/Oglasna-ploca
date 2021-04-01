//Gleda je li korisnik prijavljen te skuplja i slaže djelove za izgled trećeg stuca
import Component from "../baseComponent";
import MojiOglasi from "./spremljeniOglasi";
import DodajOglas from "./dodajOglas";
import controler from "../modelAndControler";


class TreciStupac extends Component {
  constructor() {
    super("div");
    this.rootElement.className="row z-depth-5"
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
    } else {
        let spremljeniOglasi=new MojiOglasi()
        let dodajOglas=new DodajOglas()
      
        this.addChildren([dodajOglas.rootElement, spremljeniOglasi.rootElement])
    }
  }

}

module.exports = TreciStupac;
