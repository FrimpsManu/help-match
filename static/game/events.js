import { Game } from "./game.js";

function main(){
    configureEvents({
        "load": [newGame],
    });
}

function newGame(){
    window.game = new Game();
}
main();