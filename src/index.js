M.AutoInit();
import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac";
import controler from "./modelAndControler"; 
 /* 
localStorage["user"]= false; */

document.getElementById("stupac1").appendChild(new PrviStupac().rootElement); //Popunjava prvi stupac

if(controler.user!==false){ //Ukoliko je netko prijavljen popunjava treći stupac
  document.getElementById("stupac3").appendChild(new TreciStupac().rootElement) 
}
console.log(JSON.parse(localStorage["user"]))
console.log(localStorage["user"])