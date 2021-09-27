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

}
