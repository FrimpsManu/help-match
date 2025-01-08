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
        this.person = new Person("John", "Doe", "johndoe", "helped", "specific");
        let initialPlace = this.person.role == "helped" ? [0, 0] : [Game.rows - 1, Game.cols - 1];
        this.person.place(...initialPlace);
    }

    static rows = 10;
    static cols = 10;
    static site = get("game-site");
}

export { Game };