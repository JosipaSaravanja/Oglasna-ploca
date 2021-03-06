M.AutoInit()
import PrviStupac from "./components/prviStupac";
import Provjera from "./components/provjera";
import Component from "./baseComponent";
import Controler from "./modelAndControler";
let controler = new Controler()
/*    localStorage["user"] = JSON.stringify({username: "ante"}) 
 */ 

/* console.log(JSON.parse(localStorage["user"])) */
document.getElementById("example1").appendChild(new Provjera().rootElement) 
