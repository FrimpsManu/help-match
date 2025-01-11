import { socketEvents } from "./events.js";
import { Chat } from "./chat.js";

function createChatSocket() {
    delete Chat.socket;  // Hopefully I won't be deleting the real Chat.socket often
    if (Chat.socket) {
        while (Chat.socket.CONNECTING) {}
    }
    Chat.socket = new ChatSocket();
    for (let event in socketEvents) {
        Chat.socket.addEventListener(event, socketEvents[event]);
    }
}

class ChatSocket extends WebSocket{
    constructor(){
        super(`ws${
            (location.protocol=="https:") ? 's' : ""}://${
            location.host}/ws/chat/${Chat.pod}/`
        );
    }

    personLeave(){} // Just for overriding

    chatMessage(details){
        Chat.createChat(details.sender, details.message);
    }

    sendChatMessage(chatDetails){
        this.send(JSON.stringify({
            "handler": "chat_message",
            "data": chatDetails
        }));
    }
}

export { createChatSocket, ChatSocket };