M.AutoInit();
import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac"; 

document.getElementById("example1").appendChild(new PrviStupac().rootElement); //Popunjava prvi stupac
if(JSON.parse(localStorage["user"])!==false){ //Ukoliko je netko prijavljen popunjava treći stupac
  document.getElementById("example2").appendChild(new TreciStupac().rootElement) 
}
console.log(JSON.parse(localStorage["user"]))