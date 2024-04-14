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

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    remoteStream = new MediaStream();

    document.getElementById("user1").srcObject = localStream;
    document.getElementById("user2").srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {    
        pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        });
    };

    pc.onicecandidate  = async (event) => {
        if(event.candidate){
            document.getElementById('sdp1').value = JSON.stringify(pc.localDescription)
        }
    };
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // document.getElementById("sdp1").innerText = JSON.stringify(offer);
}

const answerButton = document.getElementById("addAnswer");
const answertextbox = document.getElementById("answer");
answerButton.addEventListener("click", () => {
    const answerDescription = new RTCSessionDescription(JSON.parse(answertextbox.value));
    try {
        pc.setRemoteDescription(answerDescription);
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
    } catch (Exception) {
        console.log(Exception)
    }
});
pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === 'connected') {
        alert("Connection established!"); 
    }
};

init();