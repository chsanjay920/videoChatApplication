import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  webSocket: Socket;
  constructor(private http: HttpClient) {
    this.webSocket = io('http://localhost:4000/');
  }
  apiUrl = 'http://localhost:3000/';
  private stunServers: any = {
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
  private peerconnection = new RTCPeerConnection(this.stunServers);
  async createSection(sectionId: string) {
    let offer = await this.peerconnection.createOffer();
    await this.peerconnection.setLocalDescription(offer);
    var data = {
      sectionId: sectionId,
      sdpOffer: offer,
      sdpAnswer: null,
    };
    this.postSection(data).subscribe((res: any) => {
      if (res) {
        console.log('section created successfully!');
        this.webSocket.on('NewUserJoined', (name) => {
          console.log(name);
        });
      }
    });
  }
  async updateSection(sectionId: string) {
    let offer = await this.peerconnection.createOffer();
    await this.peerconnection.setLocalDescription(offer);
    var data = {
      sectionId: sectionId,
      sdpOffer: offer,
      sdpAnswer: null,
    };
    this.putSection(data).subscribe((res: any) => {
      if (res) {
        console.log('section created successfully!');
      }
    });
  }
  async createAnswerForOffer(SdpOffer:any)
  {
    await this.peerconnection.setRemoteDescription(SdpOffer);
    let answer = await this.peerconnection.createAnswer();
    await this.peerconnection.setLocalDescription(answer); 
  }

  async NewPeerJoinedSection()
  {
    console.log("event emitter");
    this.webSocket.emit('joined-section', "sanjay");
  }

  postSection(data: any) {
    return this.http.post<any>(`${this.apiUrl}section/`, data);
  }
  putSection(data: any) {
    console.log(data);
    return this.http.post<any>(`${this.apiUrl}sectionupdate/`, data);
  }
  getSection(id:string)
  {
    return this.http.get<any[]>(`${this.apiUrl}section/${id}`);
  }
}
