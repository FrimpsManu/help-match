// game.js

class Game {
    constructor() {
        this.build();
        this.start();
    }

    start() {
        this.player();
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
    }

    get(row, col) {
        return Game.site.rows[row].cells[col];
    }

    static rows = 10;
    static cols = 10;
    static site = get("game-site");
}

export { Game };