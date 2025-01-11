import { Pod } from "./pod.js";
import { Person } from "./person.js";
import { createGameSocket } from "./socket.js";

class Game {
    constructor() {
        this.build();
        this.start();
    }

    start() {
        // create the socket, which will get things going
        createGameSocket();
    }


    build() {
        // set the channel name
        get("game-channel").textContent = Game.data.channel;

        for (let r = 0; r < Game.rows; r++) {
            let rowParent = Game.site.insertRow();
            rowParent.className = "row";
            for (let c = 0; c < Game.cols; c++) {
                new Pod(r, c, rowParent);
            }
        }
    }

    static rows = 13;
    static cols = 13;
    static site = get("game-site");
    static data = JSON.parse(get("game-data").textContent);
    static dataFromBackend(){
        let data = Game.data;
        // process data to include firstName, lastName, username, role, specific
        return {
            firstName: data.first_name,
            lastName: data.last_name,
            username: data.username,
            role: data.role,
            specific: data.specific
        }
    }
    static channel = Game.data.channel;
}

// Game.data looks like this: {"role": "Helped", "channel": "academic-algorithms", "specific": "Backtracking", "first_name": "Daniel", "last_name": "Enesi", "username": "daniel"};

export { Game };