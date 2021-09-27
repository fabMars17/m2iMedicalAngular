import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { environment } from 'src/environments/environment';
import { PatientService } from '../service/patient.service';
import { VilleService } from '../service/ville.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {

  //ville = new Ville(10,"Brest",29000);
  //patient = new Patient(4, "roger", "Seb", "roger@sb.eu","0607089020", this.ville);
  villes: Array<Ville> = [];
  patients: Array<Patient> = [];

  newp: Patient = new Patient();

  @ViewChild('closeaction') closeactionelm: any;

  @ViewChild('optionselcted') optionselctedelm: any;

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

  submitForm(): void {
    console.log(this.newp);
    this.ps.addPatient(this.newp).subscribe(
      data => {
        console.log(data);
        this.closeactionelm.nativeElement.click();
        this.updatePatients();
      }
    )
  }

  edit(id? : number): void {
    this.ps.getPatient(id).subscribe(
      data => { 
        this.newp = data; 
        console.log( data );
        let optientsize=this.optionselctedelm.nativeElement.childNodes.length;
        console.log(this.optionselctedelm.nativeElement.childNodes);
        console.log(this.newp.ville?.nom);
        for (let index = 0; index < optientsize; index++) {
          this.optionselctedelm.nativeElement.childNodes[index].setAttribute('selected', false);
          this.optionselctedelm.nativeElement.childNodes[index].style.backgroundColor = '';
          if(this.optionselctedelm.nativeElement.childNodes[index].textContent === this.newp.ville?.nom){
            console.log(index)
            console.log(this.optionselctedelm.nativeElement.options[index]);
            this.optionselctedelm.nativeElement.childNodes[index].style.backgroundColor = 'purple';
            this.optionselctedelm.nativeElement.childNodes[index].setAttribute('selected', true);
            //index=optientsize;
          }
        }
      }
    );
   }

  delete ( id? : number):void{
    this.ps.deletePatient(id).subscribe(
      data => { 
        this.updatePatients(); 
      }
    )}
}
