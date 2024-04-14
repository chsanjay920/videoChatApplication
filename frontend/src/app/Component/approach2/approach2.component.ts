import { Component } from '@angular/core';
import { SocketService } from 'src/app/Service/socket.service';

@Component({
  selector: 'app-approach2',
  templateUrl: './approach2.component.html',
  styleUrls: ['./approach2.component.css']
})
export class Approach2Component {
  constructor(private service:SocketService)
  {

  }

  client1()
  {
    // this.service.emitSdp1();
  }
  client2()
  {

  }
}
