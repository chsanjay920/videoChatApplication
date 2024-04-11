import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getSdpObject(params['id']);
      // this.updateOffer(params['id']);
    });
  }
  getSdpObject(id:string)
  {
    this.dataservice.getSection(id).subscribe(obj=>{
      console.log(obj);
    })
  }
  updateOffer(id: string) {
    this.dataservice.putSection(id).subscribe((data) => console.log(data));
  }
}
