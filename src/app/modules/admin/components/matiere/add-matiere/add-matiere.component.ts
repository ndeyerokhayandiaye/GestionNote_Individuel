import { Component, OnInit} from '@angular/core';
import { Matiere} from 'src/app/models/matiere';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.scss']
})
export class AddMatiereComponent implements OnInit {
  id : number = 0;
  libelle!: string;
  matieres!: any[];
  etat: boolean = true;
  cleId = false;
  editMatiere: boolean = false;
  matiereEdit!: any[];

  ngOnInit(): void {
    this.matieres = JSON.parse(localStorage.getItem('matiere') || '[]');
  }

  viderChamps() {
    this.libelle = "";
  }

  changeState(param: number) {
    this.matieres.forEach(element => {
      if (element.id == param) {
        element.etat = !element.etat;
        this.editMatiere = false;
        localStorage.setItem('matiere', JSON.stringify(this.matieres));
      }
    });
  }
  editeurMatiere(param: number) {
    this.matieres.forEach(element => {
      if (element.id == param) {
        this.matiereEdit = this.matieres.filter((ele) => ele.id == param);
        this.editMatiere = true;
        // this.cleId = element.id;
      }
    });
  }
  resetForm() {
    this.editMatiere = false;
  }
  addMatiere() {
    let matiere;
    if (this.libelle[0] == " " || this.libelle.length < 2) {
      Swal.fire({
        title: "Erreur !!",
        text: "Veiller respecter le format",
        icon: "error"
      });
    } else if (this.matieres.find((ele) => ele.libelle == this.libelle)) {
      Swal.fire({
        title: "Erreur !!",
        text: `${this.libelle} existe déja`,
        icon: "error"
      });
      this.viderChamps()
    } else {
      if (localStorage.getItem('matiere') == null || localStorage.getItem('matiere') == undefined) {
        matiere = new Matiere(this.id, this.libelle, this.etat);
        localStorage.setItem('matiere', JSON.stringify([matiere]));
        // this.sweetMessage("merci", "Insertion faite avec succes", "success");
        
      } else {
        this.matieres = JSON.parse(localStorage.getItem('matiere') || '[]');
        let incrementedId = this.matieres[this.matieres.length - 1].id + 1;
        matiere = new Matiere(incrementedId, this.libelle, this.etat);
        this.matieres.push(matiere);
        localStorage.setItem('matiere', JSON.stringify(this.matieres));
        // réinitialisation du formulaire
      }
      Swal.fire({
        title: "Succes !!",
        text: "Matiere ajouter avec succes",
        icon: "success"
      });
      this.matieres = JSON.parse(localStorage.getItem('matiere') || '[]');
      this.viderChamps();
    }
  }
}
