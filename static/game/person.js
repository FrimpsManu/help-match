class Person {
    constructor(firstName, lastName, username, role, specific) {
        Person.people[username] = this;
        for (let key in arguments) {
            this[key] = arguments[key];
        }
        this.build();
        // this.event();
    }

    build(){
        (this.body = make()).className = "person";
    }

    place(row, col) {
        let newCell = Game.get(row, col);
        add(this.body, newCell).obj.pod = newCell;
    }

    event() {
        addEventListener("keyup", (event) => {
            let key = event.key;
            if (!(key in Person.moves)) return;
            let [dr, dc] = Person.moves[key];
            let [row, col] = [this.row + dr, this.col + dc];
            if (row < 0 || row >= Game.rows || col < 0 || col >= Game.cols) return;
            this.place(row, col);
        });
    }

    static moves = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1]
    };

    static people = {};
}

export { Person };