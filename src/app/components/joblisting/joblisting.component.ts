import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.scss']
})
export class JoblistingComponent implements OnInit{
  status: string = "";
  constructor(private router: Router,private restService: RestapiService){
    this.status = this.router.getCurrentNavigation()?.extras.state?.['data']["status"];
  }

  result : any = [];
  ngOnInit() {

    this.restService.subject$.subscribe((data)=>{    
      data.forEach((record)=>{
        let temp: any = {}
        if(record["count_by_status"].hasOwnProperty(this.status)){
          temp["user"] = record["user_name"]
          temp["status"] = this.status
          temp["statusCount"] = record["count_by_status"][this.status]
          this.result.push(temp);
        }
      })
    })
  }

  gotoTarget(value : string) {
    const data = {
      name : value
    };
    this.router.navigate(['/details'], { state: { data } });
  }
}
