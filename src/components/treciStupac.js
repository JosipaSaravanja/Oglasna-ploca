//Gleda je li korisnik prijavljen te skuplja i slaže djelove za izgled trećeg stuca
import Component from "../baseComponent";
import MojiOglasi from "./spremljeniOglasi";
import DodajOglas from "./dodajOglas";
import Filter from "./filter";
import controler from "../modelAndControler";


class TreciStupac extends Component {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
     let filter=new Filter()
    
      this.addChild(filter.rootElement) 
    } else {
        let spremljeniOglasi=new MojiOglasi()
        let dodajOglas=new DodajOglas()
      
        this.addChildren([dodajOglas.rootElement, spremljeniOglasi.rootElement])
    }
  }

}

module.exports = TreciStupac;
