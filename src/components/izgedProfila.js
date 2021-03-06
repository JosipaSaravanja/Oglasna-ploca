import Component from "../baseComponent";
import Controler from "../modelAndControler";
let controler = new Controler();
import PrijavaOkvir from "./prijavaOkvir";

class PrviStupac extends Component {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);
    if(user==false){
        this.nitkoNijePrijavljen()
    }else{
        this.currentUser()
    } 
}
nitkoNijePrijavljen(event){
    
}
currentUser(){
    let user = JSON.parse(localStorage["user"]);
    let naslov=document.createElement("h5")
    naslov.innerHTML=user.username
    this.addChildren([naslov])

}

 
}

module.exports = PrviStupac;
