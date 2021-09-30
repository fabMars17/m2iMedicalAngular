import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ville } from 'src/app/classes/ville';
import { VilleService } from 'src/app/service/ville.service';
import { VilleComponent } from '../ville.component';

@Component({
  selector: 'app-ville-details',
  templateUrl: './ville-details.component.html',
  styleUrls: ['./ville-details.component.css']
})
export class VilleDetailsComponent implements OnInit {

  ville :Ville = new Ville()

  constructor( private vs : VilleService, private activateRoute : ActivatedRoute, private vcomp: VilleComponent) { }

  ngOnInit(): void {
    let villeid = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.vs.getVille(villeid).subscribe(
      data => {this.ville = data}
    )
  }

  submitForm(){
    this.vcomp.submitForm()
  }
  
}
