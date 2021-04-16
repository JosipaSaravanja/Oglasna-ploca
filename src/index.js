M.AutoInit();
import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac";
import controler from "./modelAndControler"; 

document.getElementById("stupac1").appendChild(new PrviStupac().rootElement); //Popunjava prvi stupac

controler.user!==false ? document.getElementById("stupac3").appendChild(new TreciStupac().rootElement) :false;
//Ukoliko je netko prijavljen popunjava treći stupac

console.log(JSON.parse(localStorage["user"]))
console.log(localStorage["user"])