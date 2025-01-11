import { Game } from "./game.js";
import { Person } from "./person.js";
import { createGameSocket } from "./socket.js";

function main(){
    configureEvents({
        "load": [newGame],
        "mouseover": [Person.showDetails],
        "mouseout": [Person.hideDetails],
        "contextmenu": [preventRightClick],
    });
}

function newGame(){
    window.game = new Game();
}

function logError(event){
    console.error(error);
}
function messageSocket (event){
    let data = jsonObj(event.data);
    // convert handler from snake to camel
    data.handler = data.handler.replace(/(_\w)/g, (match) => match[1].toUpperCase());
    Game.socket[data.handler](data.data);
};

function closeSocket (event) {
    // create another one
    createGameSocket();
};

function openSocket(event){
    // Tell everyone I am here...
    Game.socket.sendPersonEnter(Game.dataFromBackend());
};

function errorSocket(event) {
    event.preventDefault();
    // event.target.close();
}

function preventRightClick(event){
    event.preventDefault();
}

const socketEvents = {
    "message": messageSocket,
    "close": closeSocket,
    "open": openSocket,
    "error": errorSocket
}

main();

export { socketEvents };