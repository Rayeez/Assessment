import { Injectable } from '@angular/core';
import { Job } from '../interfaces/Job';
import { User } from '../interfaces/User';


@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  constructor() { }

  public manipulateData(users: User[], jobs: Job[]) {  
    let Output: any = [];
    users.forEach((user) => {
      let userObj: any = {}
      let counts: any = {};
      let status = new Array();
      userObj["user_id"] = user.user_id;
      userObj["user_name"] = user.user_name;
      userObj["email"] = user.email;
      jobs.filter((job) => {
        let aid: number[] = job.assigned_to;
        if (aid.includes(user.user_id)) {
          let a = job.status;
          status.push(a)
        }
      });
      status.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      userObj["count_by_status"] = counts
      Output.push(userObj);
    });
    return Output;
  }

  public fetchCount(records : any[], status: string[]){
    let result : any = {};
    status.forEach((val) => {
      let temp_count = 0;
      records.filter((record) => {
        if(record.count_by_status[val] != undefined)
          temp_count = temp_count + record.count_by_status[val]
      })
      var key : string = val;
      result[key] = temp_count;
    })
    return result;   
  }
}
