import { Game } from "./game.js";

class Pod{
    constructor(row, col, rowParent){
        this.row = row;
        this.col = col;
        (this.pod = rowParent.insertCell()).className = "pod";
        this.pod.obj = this;
    }

    static get(row, col) {
        return Game.site.rows[row].cells[col];
    }
}

export { Pod };