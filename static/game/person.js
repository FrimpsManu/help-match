import { Game } from "./game.js";
import { Pod } from "./pod.js";

class Person {
    constructor(details) {
        Person.people[details["username"]] = this;
        for (let key in details) {
            this[key] = details[key];
        }
        this.build();
        this.event();
        this.makeDetails();
    }

    build(){
        (this.body = make()).className = `person ${this.role}`;
        this.body.obj = this;
    }

    place(row, col) {
        this.row = row;
        this.col = col;
        let newCell = Pod.get(row, col);
        add(this.body, newCell).obj.pod = newCell;
    }

    event() {
        addEventListener("keyup", (event) => {
            let key = event.key;
            if (!(key in Person.moves)) return;
            // will send move to socket, on socket response will move person
            // This way, everyone connected to the socket channel will see the move
            let [dr, dc] = Person.moves[key];
            let [row, col] = [this.row + dr, this.col + dc];
            if (row < 0 || row >= Game.rows || col < 0 || col >= Game.cols) return;
            this.place(row, col);
        });
    }

    makeDetails() {
        this.details = {};
        this.details["name"] = `${this.firstName} ${this.lastName}`;
        this.details["role"] = this.role;
        this.details["specific"] = this.specific;
    }
    fakeDetails() {
        return {
            "name": "",
            "role": "",
            "specific": ""
        }
    }
    static moves = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1]
    };

    static people = {};

    static showDetails(event) {
        // display person's details on "person-details" table in html
        if (event.target.classList.contains("person")) Person.fillDetails(event.target.obj.details);
    }

    static hideDetails(event) {
        if (event.target.classList.contains("person")) Person.fillDetails(event.target.obj.fakeDetails());
    }

    static fillDetails(details){
        for (let key in details) {
            get(`person-${key}`).textContent = details[key] || "";
        }
    }
    static args = ["username", "firstName", "lastName", "role", "specific"]
}

export { Person };