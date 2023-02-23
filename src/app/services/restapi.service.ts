import { Injectable } from '@angular/core';
import { Job } from '../interfaces/Job';
import { User } from '../interfaces/User';
import { Observable,BehaviorSubject, of, map, forkJoin, combineLatest } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private userUrl = "http://localhost:5000/users" // TODO put in constant file.json
  private jobsUrl = "http://localhost:5001/jobs" // TODO put in constant file.json
  constructor(private http: HttpClient) { }
  
  fetchData(): Observable<any>{
    const users$ = this.http.get<User[]>(this.userUrl);
    const jobs$ = this.http.get<Job[]>(this.jobsUrl);
    return combineLatest([users$, jobs$]);
  }

  insertJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobsUrl, job, httpOption);
  }

  public subject$ = new BehaviorSubject<any[]>([]);
  setData(value : any[]){
      this.subject$.next(value);
  }
}
