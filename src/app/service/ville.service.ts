import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ville } from '../classes/ville';
import { httpOptions } from '../app.variable';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor( private http: HttpClient) { }

  //loadCities() : Observable<Ville[]> {
  loadCities( search : String ): Observable<Ville[]> {
    return this.http.get<Ville[]>(environment.apiUrl + "ville", httpOptions);
  }

  addVille( ville : Ville ) : Observable<Ville> {
    return this.http.post<Ville>( environment.apiUrl + "ville" , ville , httpOptions )
  }

  editVille( ville : Ville ) : Observable<Ville> {
    return this.http.put<Ville>( environment.apiUrl + "ville/"+ville.id , ville , httpOptions )
  }

  getVille(id? : number ) : Observable<Ville> {
    return this.http.get<Ville>(environment.apiUrl + "ville/"+id, httpOptions);
  }

  deleteVille(id? : number ) : Observable<Ville> {
    return this.http.delete<Ville>(environment.apiUrl + "ville/"+id, httpOptions);
  }
}


