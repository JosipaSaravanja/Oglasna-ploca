
import Controler from "../modelAndControler";
let controller=new Controler();
import Component from "../baseComponent";


class IspisOglasa extends Component {
    constructor(opis, lokacija, cijena, razina, numberOfLikes, numberOfDislikes) {
        super("div");
        this.rootElement.className="card-panel grey lighten-5 z-depth-1"
        
        let row=document.createElement("div")
        row.className="row valign-wrapper"
        
        let col=document.createElement("div")
        col.className="col s11"
        
        let opisElement=document.createElement("p")
        opisElement.className="black-text"
        opisElement.innerHTML=opis
        
        let info=document.createElement("p")
        info.innerHTML=`
            lokacija: ${lokacija} <br>
            cijena:  ${cijena} <br>
            razredi: ${razina}
        `

        let ocjena=document.createElement("div")
        ocjena.className="col s1"

        let like = document.createElement("i");
        like.innerHTML = "thumb_up"
        like.className="material-icons"
        like.style="cursor: pointer; vertical-align :-3px;"
        
        like.addEventListener(
            "click",
            () => {this.like()}
            );

        let dislike = document.createElement("i");
        dislike.innerHTML = "thumb_down"
        dislike.className="material-icons"
        dislike.style="cursor: pointer; vertical-align :-10px;"
        dislike.addEventListener(
            "click",
            () => {this.dislike()}
            );

        let numberOfLikesElement=document.createElement("span")
        numberOfLikesElement.innerHTML=numberOfLikes

        let numberOfDislikesElement=document.createElement("span")
        numberOfDislikesElement.innerHTML=numberOfDislikes

        col.appendChild(opisElement)
        col.appendChild(info)
        ocjena.appendChild(numberOfLikesElement)
        ocjena.appendChild(like)
        ocjena.appendChild(dislike)
        ocjena.appendChild(numberOfDislikesElement)
        row.appendChild(col)
        row.appendChild(ocjena)
        this.addChild(row)
        
    }

    like(){
        alert("like")
    }

    dislike(){
        alert("dislike")

    }

}

module.exports = IspisOglasa;