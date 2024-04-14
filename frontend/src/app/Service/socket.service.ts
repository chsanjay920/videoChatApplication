import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  IsAdmin = 0;
  localStream: MediaStream = new MediaStream();
  remoteStream: MediaStream = new MediaStream();
  stunServers: any = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  peerconnection: RTCPeerConnection = new RTCPeerConnection(this.stunServers);
  webSocket: Socket;
  SDP1: any;

  constructor() {
    this.webSocket = io('https://videochatapplication-ovdb.onrender.com/');
    this.webSocket.on('ReceiveOffer', (data) => {
      if (this.IsAdmin == 0) {
        this.createAnswer(data);
      }
    });
    this.webSocket.on('ReceivedAnswer', (Answer) => {
      if (this.IsAdmin == 1) {
        console.log('answer received');
        try {
          this.peerconnection.setRemoteDescription(
            new RTCSessionDescription(JSON.parse(Answer))
          );
          this.localStream.getTracks().forEach((track) => {
            this.peerconnection.addTrack(track, this.localStream);
          });
          this.peerconnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
              this.remoteStream.addTrack(track);
            });
          };
        } catch (Exception) {
          console.log(Exception);
        }
      }
    });
  }
  async createAnswer(sdp: any) {
    this.peerconnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log('Adding answer candidate...:', event.candidate);
      }
    };
    await this.peerconnection.setRemoteDescription(JSON.parse(sdp));
    let answer = await this.peerconnection.createAnswer();
    await this.peerconnection.setLocalDescription(answer);
    this.webSocket.emit(
      'AnswerCreated',
      JSON.stringify(this.peerconnection.localDescription)
    );
  }

  async getUserMedia(): Promise<MediaStream[]> {
    this.IsAdmin = 1;
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    this.remoteStream = new MediaStream();
    this.localStream.getTracks().forEach((track) => {
      this.peerconnection.addTrack(track, this.localStream);
    });
    this.peerconnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      });
    };
    this.peerconnection.onicecandidate = async (event) => {
      if (event.candidate) {
        this.webSocket.emit(
          'OfferCreated',
          JSON.stringify(this.peerconnection.localDescription)
        );
      }
    };
    let offer = await this.peerconnection.createOffer();
    await this.peerconnection.setLocalDescription(offer);
    return [this.localStream, this.remoteStream];
  }

  async getUserMedia2(): Promise<MediaStream[]> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    this.remoteStream = new MediaStream();
    this.localStream.getTracks().forEach((track) => {
      this.peerconnection.addTrack(track, this.localStream);
    });
    this.peerconnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      });
    };
    return [this.localStream, this.remoteStream];
  }
}
