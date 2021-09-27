import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { httpOptions } from "../app.variable";
import { Patient } from "../classes/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor( private http: HttpClient) { }

  loadPatient() : Observable<Patient[]> {
    return this.http.get<Patient[]>(environment.apiUrl + "patient", httpOptions);
  }

  addPatient( patient : Patient ) : Observable<Patient> {
    return this.http.post<Patient>( environment.apiUrl + "patient" , patient , httpOptions )
  }

  editPatient( patient : Patient ) : Observable<Patient> {
    return this.http.put<Patient>( environment.apiUrl + "patient/"+patient.id , patient , httpOptions )
  }

  getPatient(id? : number ) : Observable<Patient> {
    return this.http.get<Patient>(environment.apiUrl + "patient/"+id, httpOptions);
  }

  deletePatient(id? : number ) : Observable<Patient> {
    return this.http.delete<Patient>(environment.apiUrl + "patient/"+id, httpOptions);
  }
}

