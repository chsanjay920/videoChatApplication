import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';
import { SocketService } from 'src/app/Service/socket.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css'],
})
export class CreateSectionComponent implements OnInit,AfterViewInit {
  localstream = new MediaStream();
  remotestream = new MediaStream();
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private socketserver: SocketService 
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // this.updateOffer(params['id']);
    });
  }
  async ngAfterViewInit() {
    // const streams = await this.socketserver.getUserMedia();
    // this.localstream = streams[0];
    // this.remotestream = streams[1];
  }
  // updateOffer(id: string) {
  //   this.dataservice.putSection(id).subscribe((data) => console.log(data));
  // }
}
