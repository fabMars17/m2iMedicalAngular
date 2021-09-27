import { Ville } from "./ville";

export class Patient {
    id : number | undefined; 
    nom : string | undefined;
    prenom: string | undefined;
    email: string | undefined;
    telephone: string | undefined;
    ville: Ville | undefined;

    constructor( _id? : number, _nom? : string, _prenom? : string, _email? : string, _telephone? : string, _ville? : Ville ){
        this.id = _id; 
        this.nom = _nom; 
        this.prenom = _prenom;
        this.email = _email; 
        this.telephone = _telephone; 
        this.ville = _ville; 
    }
    
}