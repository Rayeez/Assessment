import { Component, DoCheck, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/Job';
import { User } from 'src/app/interfaces/User';
import { RestapiService } from 'src/app/services/restapi.service';
import { FormControl } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  Object = Object;
  allstatus: string[] = ["STARTED", "INPROGRESS", "COMPLETED"];

  // Used to Insert the Data
  job_id: number = 0;
  status: string = "";
  assignedControl = new FormControl('');
  
  records = [];
  userRecords : User[] = [];
  jobsRecords : Job[] = [];
  count = {};

  constructor(private restService: RestapiService, private util : UtilityService,private router: Router) { }

  data$! : any[];

  ngOnInit(): void {
    this.restService.fetchData().subscribe((data) => {
      this.userRecords = data[0]
      this.jobsRecords = data[1]
      this.records = this.util.manipulateData(this.userRecords,this.jobsRecords);
      this.count = this.util.fetchCount(this.records,this.allstatus);
      this.restService.setData(this.records );
    });
  }

  onSubmit() {
    let obj: any = this.assignedControl.value;
    const assign: number[] = Object.values(obj);
    let newJob = {
      "assigned_to": assign,
      "status": this.status
    }
    this.restService.insertJob(newJob).subscribe((val) => {
      this.jobsRecords.push(val);
      this.records = this.util.manipulateData(this.userRecords,this.jobsRecords); 
      this.count = this.util.fetchCount(this.records,this.allstatus);  
      this.restService.setData(this.records);  
    });    
  }

  gotoTarget(value : string) {
    const data = {
      status : value
    };
    this.router.navigate(['/list'], { state: { data } });
  }
}

