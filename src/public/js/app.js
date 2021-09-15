const socket = io();
const myFace = document.getElementById("myFace");
let myStream;
socket.on("server-connection", (msg) => console.log(msg));
async function getMedia(constraints) {
    try{
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        myFace.srcObject = myStream
    }catch(err){
        console.log(err);
    }
}

getMedia();