import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationGuard } from '../authentification.guard';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],

})
export class AppHeaderComponent implements OnInit {

  //@ViewChild('modulAjax') modalAjaxelm: HTMLElement | undefined ;
  
  constructor(private router : Router, public guard : AuthentificationGuard) { }

  ngOnInit(): void {
    
  }

  logOut() : void {
    sessionStorage.removeItem("connectedUser");
    this.router.navigate(['login'])
  }
  /*doAjaxF() {
    let fileToLoad = "../login/login.component.html";

    fetch(fileToLoad)
        .then((response) => {
            console.log(response);
            if (response.status == 404) {}
            return response.text();
        })
        .then((html) => {
            

            console.log(html);
            //this.modalAjaxelm?.nativeElement.innerHTML = html;
       })
        .catch((error) => {
            console.warn('Something went wrong.', error);
            // Code for handling the error
        });
    }*/

}
