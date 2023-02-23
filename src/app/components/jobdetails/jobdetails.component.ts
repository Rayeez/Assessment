import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {
  userName: string = "";

  constructor(private router: Router, private restService: RestapiService) {
    this.userName = this.router.getCurrentNavigation()?.extras.state?.['data']["name"];
  }

  userEmail: string = ""
  userId: number = 0
  userStatus: [] = [];

  result: any = [];
  ngOnInit() {

    this.restService.subject$.subscribe((data) => {
      let userData = data.filter((record) => {
        return record["user_name"] === this.userName;
      })
      this.userEmail = userData[0]["email"];
      this.userId = userData[0]["user_id"];
      this.userStatus = userData[0]["count_by_status"];
    })
  }
}
