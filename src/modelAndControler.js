class Controler extends EventTarget {
    constructor(){
        super();
        this.user=JSON.parse(localStorage["user"]) ;
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
}
let controler=new Controler
module.exports = controler;