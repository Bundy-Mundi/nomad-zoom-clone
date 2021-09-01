const messageList = document.getElementById("message-list");
const chatForm = document.getElementById("chat-form");
const socket = new WebSocket(`ws://${window.location.host}`);
const fn = (e) => {
    e.preventDefault();
    let input = chatForm.querySelector("input");
    socket.send(`Client: ${input.value}`);
    input.value = "";
}
socket.addEventListener("open", () => console.log("Connected to web browser."));
socket.addEventListener("message", (msg) => {
    msg.data.text().then(text => {
        let newList = document.createElement("li")
        newList.appendChild(document.createTextNode(text));
        messageList.appendChild(newList);
        console.log(text);
    });
});
socket.addEventListener("close", () => console.log("Connection closed."))
chatForm.addEventListener("submit", fn);