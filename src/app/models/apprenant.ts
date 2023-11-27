export class Apprenant {
  public id:number=1;
  public matricule:String="";
  public nom:String="";
  public prenom:String="";
  public email:String="";
  public numero:String="";
  public classe:String="";
  public pass:String="";
  public photo:String = "";
  public etat: String = "";
  public note?: string[];


  constructor(matricule:String,nom:String,prenom:String,email:String,numero:String,classe:String,pass:String,id:number,photo:String,etat:String, note?:string[]) {
    this.id=id;
    this.matricule=matricule;
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.numero=numero;
    this.classe=classe;
    this.pass=pass;
    this.photo=photo;
    this.etat = etat;
    this.note = note;
  }
}
