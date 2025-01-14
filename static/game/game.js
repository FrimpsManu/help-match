import { Pod } from "./pod.js";
import { Person } from "./person.js";

class Game {
    constructor() {
        this.build();
        this.start();
    }

    start() {
        // this.player();
    }

    end() {
        console.log('Game ended');
    }

    build() {
        for (let r = 0; r < Game.rows; r++) {
            let rowParent = Game.site.insertRow();
            rowParent.className = "row";
            for (let c = 0; c < Game.cols; c++) {
                new Pod(r, c, rowParent);
            }
        }

        this.person = new Person(Game.dataFromBackend());
        let initialPlace = this.person.role == "helped" ? [0, 0] : [Game.rows - 1, Game.cols - 1];
        this.person.place(...initialPlace);
        // set the channel name
        get("game-channel").textContent = Game.data.channel;
    }

    static rows = 13;
    static cols = 13;
    static site = get("game-site");
    static data = JSON.parse(get("game-data").textContent);
    static dataFromBackend(){
        let data = Game.data,
        personData = {}
        console.log(data);
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