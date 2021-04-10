//Gleda je li korisnik prijavljen te skuplja i slaže djelove za izgled trećeg stuca
import Component from "../baseComponent";
import MojiOglasi from "./mojiOglasi";
import DodajOglas from "./dodajOglas";
import Filter from "./filter";
import controler from "../modelAndControler";

class TreciStupac extends Component {
  constructor() {
    super("div");
    controler.user == false
      ? this.addChild(new Filter().rootElement)
      : this.addChildren([
          new DodajOglas().rootElement,
          new MojiOglasi().rootElement,
        ]);
    /*     Ukoliko nitko nije prijavljen onda this.addChild s popisom županija, a ukoliko je onda this.addChildren gumb za unos novog oglasa i listu vec prije unesenih oglasa
     */
  }
}

module.exports = TreciStupac;
