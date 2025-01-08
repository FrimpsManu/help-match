import { Game } from "./game.js";

class HelpSocket extends WebSocket {
    constructor() {
        super(`ws${
            location.protocol == "https:" ? 's' : ''
        }://${location.host}/ws/game`);
    }

    move(key) {
        this.send(JSON.stringify({
            "action": "move",
            "key": key
        }));
    }
}

export { HelpSocket };