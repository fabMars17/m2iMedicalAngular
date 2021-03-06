import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Ville } from '../classes/ville';
import { environment } from 'src/environments/environment';
import { Input } from '@angular/core';
import { VilleService } from '../service/ville.service';

let newVille = true;

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})

export class VilleComponent implements OnInit {

  //ville = new Ville(12,"Dijon",82000);
  villes: Array<Ville> = [];
  newv: Ville = new Ville();
  search : String = "";

  @ViewChild('closeaction') closeactionelm: any;
  //@Input()  nom : string = ""
  constructor(private vs: VilleService) { }

  ngOnInit(): void {
    this.updateCities();
  }

  updateCities(): void {
    this.vs.loadCities( this.search).subscribe(
      data => {
        this.villes = data;
        console.log(data);
      }
    )
  }

  add(): void {
    newVille = true;
    this.newv.id=undefined;
    this.newv.nom=undefined;
    this.newv.codepostal=undefined;
    console.log(this.newv);
  }

  submitForm(): void {
    if (newVille) {// add new ville
      this.vs.addVille(this.newv).subscribe(
      data => {
        console.log(data);
        this.closeactionelm.nativeElement.click();
        this.updateCities();
      })
    }
    else {
      this.vs.editVille(this.newv).subscribe(
        data => {
          console.log(data);
          this.closeactionelm.nativeElement.click();
          this.updateCities();
        })
    }
  }

  edit(id?: number): void {
    newVille = false;
    this.vs.getVille(id).subscribe(
      data => {
        this.newv = data;
        console.log(data);
      }
    );
  }

  delete(id?: number): void {
    if(confirm ("Etes vous sur ?")){
    this.vs.deleteVille(id).subscribe(
      data => {
        this.updateCities();
      }
    );
    }
  }
  /*  https://angular.io/guide/binding-syntax   */
  /*  https://angular.io/guide/property-binding */
  /*  https://angular.io/guide/event-binding // see --> live exmeples */
  /*deleteTown(event?: MouseEvent) : void {
   let posv = 0;
   for (let index = 0; index < this.villes.length; index++) {
     if(this.villes[index].id == id){posv=index;index=this.villes.length}
   }
   //const d=event ?(event.currentTarget as HTMLButtonElement).value : '';
   //this.http.delete( environment.apiUrl  + "ville/delete/" + d ,
   //httpOptions ).subscribe((s)=> {console.log(s);this.updateCities();})

  }*/
}