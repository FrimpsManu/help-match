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

    leave() {
        this.body.remove();
        delete Person.people[this.username];
    }

    build(){
        (this.body = make()).className = `person ${this.role}`;
        this.body.obj = this;
        this.place(...(this.role == "Helped" ? [0, 0] : [Game.rows - 1, Game.cols - 1]));
    }

    move(dir){
        let [dr, dc] = Person.moves[Person.keys[dir]];
        let [row, col] = [this.row + dr, this.col + dc];
        if (row < 0 || row >= Game.rows || col < 0 || col >= Game.cols) return;
        this.place(row, col);
        this.shouldLeave && this.exit();
    }

    get shouldLeave(){
        // remember that objects in JS have no equality.
        // Use sameArray function from https://danielongithub17.github.io/funcs.js
        // Note: this function doesn't really check length of pod's children
        let children = [...this.pod.children].map(child => child.obj);
        let canReload = children.map(child => child.username).includes(Game.data.username)
        , touchingDifferent = sameArray(
            children.map(child => child.role).sort(), Person.roles
        );
        return canReload && touchingDifferent;
    }

    exit(){
        // log the names of the people in the pod to local storage
        // then redirect to chat page.
        // It is impossible to have two people with the same username
        // So, joining the names with "_" will be a unique channel name for backend.
        let children = [...this.pod.children].map(child => child.obj);
        let uniquePodName = children.map(child => child.username).sort().join("_")
        ,  helper = children.find(child => child.role == "Helper")
        ,  helped = children.find(child => child.role == "Helped");
        let user = Game.data.username
        ,  other = children.find(child => child.username != user).username;

        localStorage["saved-help-match-pod"] = jsonStr({
            "pod": uniquePodName,
            "username": Game.data.username,
            "helper": helper.chatDetails,
            "helped": helped.chatDetails,
            user: Person.people[user].chatDetails,
            other: Person.people[other].chatDetails
        });
        location.href = "/chat/";
    }

    place(row, col) {
        this.row = row;
        this.col = col;
        let newCell = Pod.get(row, col);
        add(this.body, newCell).obj.pod = newCell;
    }

    event() {
        // if not the user, don't allow movement
        if (this.username != Game.data.username) return;
        addEventListener("keyup", (event) => {
            let key = event.key;
            if (!(key in Person.moves)) return;
            // will send move to socket, on socket response will move person
            // This way, everyone connected to the socket channel will see the move
            Game.socket.sendPersonMove({
                "dir": Person.keys.indexOf(key),
                "username": this.username
            }); // O(4) => O(1)
        });

        addEventListener("beforeunload", Game.socket.sendPersonLeave);
    }

    sendMove(dir) {
        Game.socket.sendPersonMove({
            "username": this.username,
            "dir": dir
        });
    }

    get socketDetails() {
        let socketDetails = Game.dataFromBackend();
        socketDetails["row"] = this.row;
        socketDetails["col"] = this.col;
        return socketDetails;
    }

    get chatDetails() {
        return {
            "role": this.role,
            "specific": this.specific,
            "username": this.username,
            "name": `${this.firstName} ${this.lastName}`
        }
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

    static keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

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
    static roles = ["Helped", "Helper"];
}

export { Person };