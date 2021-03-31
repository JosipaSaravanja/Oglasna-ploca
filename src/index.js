M.AutoInit()
import PrviStupac from "./components/PrviStupac"; 
import TreciStupac from "./components/treciStupac"; 
localStorage["user"]
/* localStorage["user"]  = JSON.stringify({username: "ante"}) 


/* console.log(JSON.parse(localStorage["user"])) */
document.getElementById("example1").appendChild(new PrviStupac().rootElement) /* 
document.getElementById("treciStupac").appendChild(new MojiOglasi().rootElement)  */
document.getElementById("treciStupac").appendChild(new TreciStupac().rootElement) 
