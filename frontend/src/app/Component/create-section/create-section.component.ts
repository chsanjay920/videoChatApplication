import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css'],
})
export class CreateSectionComponent implements OnInit {
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // this.updateOffer(params['id']);
    });
  }
  // updateOffer(id: string) {
  //   this.dataservice.putSection(id).subscribe((data) => console.log(data));
  // }
}
