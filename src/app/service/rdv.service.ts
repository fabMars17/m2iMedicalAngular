import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { httpOptions } from "../app.variable";
import { Rdv } from "../classes/rdv";

@Injectable({
    providedIn: 'root'
  })
  export class RdvService {
  
    constructor( private http: HttpClient) { }
  
    loadRdv() : Observable<Rdv[]> {
      return this.http.get<Rdv[]>(environment.apiUrl + "rdv", httpOptions);
    }
  
    addRdv( rdv : Rdv ) : Observable<Rdv> {
      return this.http.post<Rdv>( environment.apiUrl + "rdv" , rdv , httpOptions )
    }
  
    editRdv( rdv : Rdv ) : Observable<Rdv> {
      return this.http.put<Rdv>( environment.apiUrl + "rdv/"+rdv.id , rdv , httpOptions )
    }
  
    getRdv(id? : number ) : Observable<Rdv> {
      return this.http.get<Rdv>(environment.apiUrl + "rdv/"+id, httpOptions);
    }
  
    deleteRdv(id? : number ) : Observable<Rdv> {
      return this.http.delete<Rdv>(environment.apiUrl + "rdv/"+id, httpOptions);
    }
  }