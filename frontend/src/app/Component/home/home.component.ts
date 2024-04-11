import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router,
    private dataservice:DataService
  ) {}
  redirectToCreate() {
    var sectionId = this.getId();
    this.dataservice.createSection(sectionId);
    this.router.navigate(['/section'],
      { queryParams: { id: sectionId }}
    );
  }
  getId()
  {
    var id = "";
    id+=Math.floor(Math.random()*(999-100+1)+100)+"-";
    id+=Math.floor(Math.random()*(999-100+1)+100)+"-";
    id+=Math.floor(Math.random()*(999-100+1)+100);
    return id;
  }
  connect()
  {
    this.dataservice.NewPeerJoinedSection();
  }
}
