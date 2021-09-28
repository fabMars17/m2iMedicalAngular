import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { environment } from 'src/environments/environment';
import { PatientService } from '../service/patient.service';
import { VilleService } from '../service/ville.service';

let newPatient = true;


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  succes = false;
  error = false;
  //ville = new Ville(10,"Brest",29000);
  //patient = new Patient(4, "roger", "Seb", "roger@sb.eu","0607089020", this.ville);
  villes: Array<Ville> = [];
  patients: Array<Patient> = [];

  newp: Patient = new Patient();

  @ViewChild('closeaction') closeactionelm: any;

  @ViewChild('optionselcted') optionselectedelm: any;

  constructor(private ps: PatientService, private vs: VilleService) { }

  ngOnInit(): void {
    this.updatePatients();
  }

  updatePatients(): void {
    this.ps.loadPatient().subscribe(
      data => {
        this.patients = data;
        console.log(data);
      }
    )
    this.vs.loadCities().subscribe(
      data => {
        console.log(data);
        this.villes = data;
      }
    );
  }

  add(): void {
    this.succes = false;
    this.error = false;
    newPatient = true;
    this.newp.id=undefined;
    this.newp.nom=undefined;
    this.newp.prenom=undefined;
    this.newp.email=undefined;
    this.newp.telephone=undefined;
    this.newp.ville=undefined;
    console.log(this.newp);
  }

  submitForm(): void {
    
    if(newPatient){
      this.ps.addPatient(this.newp).subscribe(
            data => {
              console.log(data);
              this.closeactionelm.nativeElement.click();
              this.updatePatients();
              this.succes = true;
            } ,
            error => {
              console.log(error);
              this.error = true;
            })
    }else{
      this.ps.editPatient(this.newp).subscribe(
        data => {
          console.log(data);
          this.closeactionelm.nativeElement.click();
          this.updatePatients();
        } ,
        error => {
          console.log(error);
          this.error = true;
        })
    }
    console.log(this.newp);
    
  }

  edit(id? : number): void {
    this.succes = false;
    this.error = false;
    newPatient = false;
    this.ps.getPatient(id).subscribe(
      data => { 
        this.newp = data; 
        console.log( data );

        this.optionselectedelm.nativeElement.options[20].setAttribute('selected', '')
        /*let optientsize=this.optionselectedelm.nativeElement.childNodes.length-1;
        console.log(this.optionselectedelm.nativeElement.childNodes);
      
        for (let index = 1; index < optientsize; index++) {
          //this.optionselctedelm.nativeElement.options[index].selected = '';
          //this.optionselectedelm.nativeElement.options[index].setAttribute('selected', 'false')
          //this.optionselectedelm.nativeElement.options[index].removeAttribute('selected');
          //this.optionselectedelm.nativeElement.options[index].selected = false;
          if(this.optionselectedelm.nativeElement.childNodes[index].textContent === this.newp.ville?.nom){
            console.log(index)
            //console.log(this.optionselectedelm.nativeElement.options[index]);
            //this.optionselctedelm.nativeElement.options[index].style.backgroundColor = 'purple';
            //this.optionselctedelm.nativeElement.options[index].selected = 'selected';
            //this.optionselectedelm.nativeElement.options[index].setAttribute('selected', '')
            //this.optionselectedelm.nativeElement.options[index].selected = true;
            //index=optientsize;
          }
        }*/
      }
      

    );
   }

   checkVille(a : Ville, b: Ville) : boolean {
     return a != undefined && b != undefined && a.id == b.id;
   }

  delete ( id? : number):void{
    if(confirm ("Etes vous sur ?")){
    this.ps.deletePatient(id).subscribe(
      data => { 
        this.updatePatients(); 
      }
    )}
  }

}
