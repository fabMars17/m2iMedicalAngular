import { Patient } from "./patient";

export class Rdv {
    id : number | undefined; 
    date: string | undefined
    type : string | undefined; 
    duree: string | undefined;
    note: string | undefined;
    patient: Patient | undefined;

    constructor( _id? : number | undefined, _date? : string  | undefined, _type? : string  | undefined, _duree? : string  | undefined, _note? : string |  undefined, _patient? : Patient |  undefined) {
        this.id = _id; 
        this.date = _date;
        this.type = _type;
        this.duree = _duree; 
        this.note = _note;
        this.patient = _patient; 
    }
}