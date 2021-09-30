import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { httpOptions } from "../app.variable";
import { Patient } from "../classes/patient";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http : HttpClient) {}

    auth( u: any) {
        return this.http.post<any>(environment.apiUrl + "login" , u , httpOptions );
    }
}