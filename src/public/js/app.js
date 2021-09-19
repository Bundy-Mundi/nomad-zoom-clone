const socket = io();
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const camBtn = document.getElementById("cam");
const camerasSelect = document.getElementById("cameras");
let myStream;
let isMuted = true;
let isCamOff = true;
const defaultConstraints = {
    audio: true,
    video: true
}
// socket.on("server-connection", (msg) => console.log(msg));
async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        cameras.forEach(camera => {
            let child = document.createElement("option");
            child.innerText = camera.label;
            child.value = camera.deviceId;
            camerasSelect.appendChild(child);
        })
    } catch (error) {
        console.log(error)
    }
}
async function getMedia(constraints) {
    try{
        myStream = await navigator.mediaDevices.getUserMedia(constraints);
        myFace.srcObject = myStream;
        myStream.getAudioTracks()
            .forEach(track => (track.enabled = false));
        myStream.getVideoTracks()
            .forEach(track => (track.enabled = false));
    }catch(err){
        console.log(err);
    }
}
function handleMute (){
    isMuted = !isMuted;
    myStream.getAudioTracks()
        .forEach(track => (track.enabled = !track.enabled));
    if(isMuted) {
        muteBtn.innerText = "Unmute";
    }
    else {
        muteBtn.innerText = "Mute";
    }
}
function handleCam (){
    isCamOff = !isCamOff;
    myStream.getVideoTracks()
        .forEach(track => (track.enabled = !track.enabled));
    if(isCamOff) {
        camBtn.innerText = "Turn Camera Off";
    }
    else {
        camBtn.innerText = "Turn Camera On";
    }
}
function handleCameraChange(){
    const constraints = {
        audio: true,
        video: {deviceId:camerasSelect.value}
    }
    // getMedia(constraints);
}

getMedia(constraints);
getCameras();

muteBtn.addEventListener("click", handleMute);
camBtn.addEventListener("click", handleCam);
camerasSelect.addEventListener("input", handleCameraChange);