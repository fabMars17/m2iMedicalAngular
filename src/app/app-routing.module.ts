import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationGuard } from './authentification.guard';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { RdvComponent } from './rdv/rdv.component';
import { VilleDetailsComponent } from './ville/ville-details/ville-details.component';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  { path : 'patient' , component : PatientComponent , canActivate : [AuthentificationGuard] },
  { path : 'ville' , component : VilleComponent , canActivate : [AuthentificationGuard]},
  { path : 'ville/edit/:id' , component : VilleDetailsComponent , canActivate : [AuthentificationGuard]},
  {path : 'rdv' , component : RdvComponent , canActivate : [AuthentificationGuard] },
  { path : 'login' , component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
