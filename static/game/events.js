import { Game } from "./game.js";
import { Person } from "./person.js";

function main(){
    configureEvents({
        "load": [newGame],
        "mouseover": [Person.showDetails],
        "mouseout": [Person.hideDetails]
        // "beforeunload": [game.end]
    });
}

function newGame(){
    window.game = new Game();
}

main();