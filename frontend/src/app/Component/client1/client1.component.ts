import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/Service/socket.service';

@Component({
  selector: 'app-client1',
  templateUrl: './client1.component.html',
  styleUrls: ['./client1.component.css'],
})
export class Client1Component implements AfterViewInit {
  localstream = new MediaStream();
  remotestream = new MediaStream();

  constructor(private socketserver: SocketService) {}
  async ngAfterViewInit() {
    const streams = await this.socketserver.getUserMedia();
    this.localstream = streams[0];
    this.remotestream = streams[1];
  }
}
