import { Game } from "./game.js";
import { Person } from "./person.js";
import { socketEvents } from "./events.js";

function createGameSocket() {
    delete Game.socket;  // Hopefully I won't be deleting the real Game.socket often
    if (Game.socket) {
        while (Game.socket.CONNECTING) {}
    }
    Game.socket = new GameSocket();
    for (let event in socketEvents) {
        Game.socket.addEventListener(event, socketEvents[event]);
    }
}

class GameSocket extends WebSocket{
    constructor(){
        super(`ws${
            (location.protocol=="https:") ? 's' : ""}://${
            location.host}/ws/game/${Game.channel}/`
        );
    }

    formerEnter(data){
        let [ username, former ] = [ data["username"], data["former"] ];
        if (!(username == Game.data.username)) return;
        let formerPerson = new Person(former);
        formerPerson.place(former.row, former.col);
    }

    personLeave(personDetails){
        let username = personDetails.username;
        username in Person.people && Person.people[username].leave();
    }

    personMove(moveDetails){
        let username = moveDetails.username;
        if (username in Person.people) Person.people[username].move(moveDetails.dir);
    }

    personEnter(personDetails){
        let username = personDetails.username;
        if (!(username in Person.people)) {
            new Person(personDetails);
            let former = Game.data.username;
            // Don't do anything if it's me entering
            // else send self to this new person
            username != former && this.sendFormerEnter(former, username);
        }
    }

    sendFormerEnter(former, username){
        let formerPersonDetails = Person.people[former].socketDetails;
        console.log(formerPersonDetails);
        this.send(JSON.stringify({
            "handler": "former_enter",
            "data": {
                "username": username,
                "former": formerPersonDetails
            }
        }));
    }

    sendPersonEnter(personDetails){
        this.send(JSON.stringify({
            "handler": "person_enter",
            "data": personDetails
        }));
    }

    sendPersonMove(moveDetails){
        this.send(JSON.stringify({
            "handler": "person_move",
            "data": moveDetails
        }));
    }
}

export { createGameSocket, GameSocket };