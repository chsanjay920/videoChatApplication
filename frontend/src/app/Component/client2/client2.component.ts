import { AfterViewInit, Component } from '@angular/core';
import { SocketService } from 'src/app/Service/socket.service';

@Component({
  selector: 'app-client2',
  templateUrl: './client2.component.html',
  styleUrls: ['./client2.component.css'],
})
export class Client2Component implements AfterViewInit{
  localstream = new MediaStream();
  remotestream = new MediaStream();
  constructor(private socketService: SocketService) {
  }
  async ngAfterViewInit() {
    const streams =await this.socketService.getUserMedia2();
    this.localstream = streams[0];
    this.remotestream = streams[1];
  }
}
