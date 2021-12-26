
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from 'src/app/models/maintenance';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http:HttpClient){}

  //-------------------Database maintenance methods-------------------

  urlmaintenances  = "https://crudbackendllopez.herokuapp.com/maintenance/"

  postMaintenance(maintenance: Maintenance): Observable<any>{
		return this.http.post(this.urlmaintenances, maintenance);
	}
  getMaintenances(): Observable<any>{
    return this.http.get(this.urlmaintenances);
  }

  getMaintenance(id: any): Observable<any>{
    return this.http.get(`${this.urlmaintenances}/${id}`);
  }
  
  putMaintenance(id: string, maintenance: Maintenance):Observable<any>{
		return this.http.put(`${this.urlmaintenances}/${id}`, maintenance);
	}

	deleteMaintenance(id: String): Observable<any>{
		return this.http.delete(`${this.urlmaintenances}/${id}`);
	}
  //-------------------Testimonials-------------------
  
  urlmessages  = "https://crudbackendllopez.herokuapp.com/message/"
  
  postMessage(message: Message): Observable<any>{
    return this.http.post(this.urlmessages, message);
  }
  
  getMessages(): Observable<any>{
    return this.http.get(this.urlmessages);
  }
}
