const answerbtn = document.getElementById("createanswer");
let answertextbox = document.getElementById("answer");
const sdptextbox = document.getElementById("sdp1");
let localStream;
let remoteStream;

const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
const pc = new RTCPeerConnection(servers);



answerbtn.addEventListener("click", async () => {
    const sdp = sdptextbox.value;
    // await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(sdp)));
    // const answerDescription = await pc.createAnswer();
    // await pc.setLocalDescription(answerDescription);
    // answertextbox.value = JSON.stringify(answerDescription);


    let offer = JSON.parse(sdp);
    pc.onicecandidate = async (event) => {
        if(event.candidate){
            console.log('Adding answer candidate...:', event.candidate)
            answertextbox.value = JSON.stringify(pc.localDescription)
        }
    };
    await pc.setRemoteDescription(offer);

    let answer = await pc.createAnswer();
    await pc.setLocalDescription(answer); 
});

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    remoteStream = new MediaStream();
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
    });
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };
    document.getElementById("user1").srcObject = localStream;
    document.getElementById("user2").srcObject = remoteStream;
}
init();