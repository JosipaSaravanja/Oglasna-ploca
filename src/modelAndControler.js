class Controler extends EventTarget {
    constructor(){
        super(); 
        localStorage.getItem('user')== null?localStorage.setItem('user', false): false;
        this.user=JSON.parse(localStorage.getItem("user"));
        console.log(this.user)
    }

    addOglas(event){
        this.dispatchEvent(
            new CustomEvent(
                "newOglas",
                {detail: {oglas: event}}
                )
        );

    }

    zupanija(event){
        this.dispatchEvent(
            new CustomEvent(
                "zupanije",
                {detail: {zupanija: event}}
                )
        );
    }
}
let controler=new Controler
module.exports = controler;