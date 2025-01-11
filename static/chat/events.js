import { createChatSocket } from "./socket.js";
import { Chat } from "./chat.js";

function main(){
    configureEvents({
        "load": [Chat.start],
        "close": [Chat.clearChatDetails],
    });
}

function logError(event){
    console.error(error);
}

function messageSocket (event){
    let data = jsonObj(event.data);
    // convert handler from snake to camel
    data.handler = data.handler.replace(/(_\w)/g, (match) => match[1].toUpperCase());
    Chat.socket[data.handler](data.data);
};

function closeSocket (event) {
    // create another one
    createChatSocket();
};

function openSocket(event){};

function errorSocket(event) {
    event.preventDefault();
    // event.target.close();
}

const socketEvents = {
    "message": messageSocket,
    "close": closeSocket,
    "open": openSocket,
    "error": errorSocket
}

main();

export { socketEvents };