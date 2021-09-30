import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../classes/patient';
import { Rdv } from '../classes/rdv';
import { PatientService } from '../service/patient.service';
import { RdvService } from '../service/rdv.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  newRdv : boolean = true;
  succes = false;
  error : boolean = false;

  @ViewChild('closeaction') closeactionelm: any;
  
  patients: Array<Patient> = [];
  rdvs: Array<Rdv> = []
  
  // only for insert test //
  /*r = { id: 0, date: "2021-10-17T14:45", type: "Consultation", duree: "15", note: "Maux de tetes", patient: { 
        id: 35, nom: "Boule",prenom: "Boule", email: "bou@mi.us", telephone: "04 10 11 12 21", photo: null, ville: {
        id: 30, nom: "Amiens", codepostal: 88800,}}}*/

  d :string ="";
  h :string ="";

  newp: Patient = new Patient();
  newr :Rdv = new Rdv();

  constructor(private rs: RdvService, private ps: PatientService) { }

  ngOnInit(): void {
    this.updateRdv();
    
  }
  
  add(){
    this.newRdv = true;
    this.newr.id = undefined;
    this.newr.date = undefined;
    this.newr.duree = undefined;
    this.newr.type = undefined;
    this.newr.note = undefined;
    this.newr.patient = undefined;
  }

  updateRdv(): void {
    this.rs.loadRdv().subscribe(
      data => {
        this.rdvs = data;
        console.log(this.rdvs);
      }
    )
    this.ps.loadPatient("").subscribe(
      data => {
        console.log(data);
        this.patients = data;
      }
    );
  }

  submitForm(){
    this.newr.date = this.d+'T'+this.h // decalage de 3h probleme de timezone
    this.newr.duree +='' 
    
    console.log(this.newr);
    if(this.newRdv){
      this.newr.patient = this.newp
      this.rs.addRdv(this.newr).subscribe(
      data => {
        console.log(data);
        this.closeactionelm.nativeElement.click();
        this.updateRdv();
        //this.succes = true;
      } ,
      error => {
        console.log(error);
        //this.error = true;
      })
    }
    else {
      this.rs.editRdv(this.newr).subscribe(
        data => {
          console.log(data);
          this.closeactionelm.nativeElement.click();
          this.updateRdv();
        } ,
        error => {
          console.log(error);
          this.error = true;
        })
    }
  }

  


  edit(id? : number): void {
    this.succes = false;
    this.error = false;
    this.newRdv = false;
    this.rs.getRdv(id).subscribe(
      data => { 
        //this.newr.date = this.d+'T'+this.h // decalage de 3h probleme de timezone
    //this.newr.duree +='' 
    //this.newr.patient = this.newp
        this.newr = data;
        
        let B = 0;
        let C: number | undefined ;

        C = this.newr.date?.indexOf('T')
        // Why i need to check C ?? 
        //https://stackoverflow.com/questions/28975896/is-there-a-way-to-check-for-both-null-and-undefined
        if(C) {
          console.log(this.newr.date?.slice(C, B) );
          this.d = this.newr.date?.slice(0, C)+''
          C++;B=C+5;
          this.h = this.newr.date?.slice(C, B)+''
        }
        console.log( data );

      }
    );
   }

  delete ( id? : number):void{
    if(confirm ("Etes vous sur ?")){
    this.rs.deleteRdv(id).subscribe(
      data => { 
        this.updateRdv(); 
      }
    )}
  }
}
