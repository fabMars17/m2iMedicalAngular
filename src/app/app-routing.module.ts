import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  {path : 'patient', component : PatientComponent },
  {path : 'ville' , component : VilleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
