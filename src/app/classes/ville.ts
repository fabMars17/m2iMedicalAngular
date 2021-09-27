export class Ville {
    id : number | undefined; 
    nom : string | undefined; 
    codepostal: number | undefined;

    constructor( _id? : number | undefined, _nom? : string  | undefined, _codepostal? : number |  undefined){
        this.id = _id; 
        this.nom = _nom; 
        this.codepostal = _codepostal; 
    }

    /*
    public get $id() {
        return this._id;
    }

    setId(id : number) {
        this._id = id;
    }

    public get $nom() {
        return this._nom;
    }
    setNom(id : number) {
        this._id = id;
    }

    codepostal() {
        return this._codepostal;
    }*/
}
