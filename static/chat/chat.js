import { createChatSocket } from "./socket.js";

// might just be a static class
class Chat {
    static getChatDetails(){
        // from the localstorage that was saved in person.js
        Chat.data = jsonObj(localStorage["saved-help-match-pod"]);
        if (!Chat.data) location.href = "/";
    }

    static loadChatDetails(){
        get("helper-name").textContent = Chat.data.helper.name;
        get("helped-name").textContent = Chat.data.helped.name;
        get("channel").textContent = `${get("game-channel").textContent} chat.`;
        Chat.pod = Chat.data.pod;
    }

    static events(){
        let chatbox = get("chatbox"),
            send = get("send");

        send.addEventListener("click", ()=>{
            let message = chatbox.value.trim();
            chatbox.value = "";
            if (!message) return;
            Chat.socket.sendChatMessage({
                "sender": Chat.data.username,
                "message": message
            });
        });
    }

    static createChat(sender, message){
        // create a chat using div for the chat holder
        // h4 to hold the sender name
        // p to hold the message
        let chatHolder = make(),
            senderName = make("h4"),
            messageHolder = make('p');
        
        let sentBy = chatHolder.className = sender == Chat.data.username ? "user" : "other";
        senderName.textContent = Chat.data[sentBy].name;
        messageHolder.textContent = message;

        [senderName, messageHolder].forEach(child=>add(child, chatHolder));
        add(chatHolder, Chat.chatsHolder).scrollIntoView();

    }

    static clearChatDetails(){
        localStorage.removeItem("saved-help-match-pod");
    }

    static start(event){
        Chat.getChatDetails();
        Chat.loadChatDetails();
        Chat.events();
        createChatSocket();
    }

    static chatsHolder = get("messages");
}

export { Chat };