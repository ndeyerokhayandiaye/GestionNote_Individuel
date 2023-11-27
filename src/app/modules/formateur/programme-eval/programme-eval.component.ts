import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from 'src/app/models/avaluation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programme-eval',
  templateUrl: './programme-eval.component.html',
  styleUrls: ['./programme-eval.component.scss']
})
export class ProgrammeEvalComponent implements OnInit {
  // attributs
  anneeAcademic: string = "";
  semestre: string = "";
  classe: string = "";
  date = "";
  matiere: string = "";
  type: string = "";
  etat: number = 1;

  // declaration du tableau d'Evaluation
  pourEvaluation: Evaluation[] = [];

  // notre tableau d'Evaluation récupérée à partir du localstaorage
  tabEvaluation: any;

  idLastEvaluation: number = 0;

  // Définition du constructeur
  constructor(private route: ActivatedRoute, private router: Router) { }

  // methodes
  ngOnInit() {
    if (!localStorage.getItem("Eval")) {
      localStorage.setItem("Eval", JSON.stringify(this.pourEvaluation));
    }
    // renvoie un tableau de valeur ou un tableau vide
    this.tabEvaluation = JSON.parse(localStorage.getItem("Eval") || '[]');

    // on verifie si le tableau n'est pas vide
    if (this.tabEvaluation.length != 0) {
      // pour recuperer le dernier eleMent du tableau
      this.idLastEvaluation = this.tabEvaluation[this.tabEvaluation.length - 1].idEvaluation;
    }
    console.log(this.idLastEvaluation);
  }

  // pour vider les champs
  viderChamps() {
    this.anneeAcademic = "";
    this.semestre = "";
    this.classe = "";
    this.date = "";
    this.matiere = "";
    this.type = "";
  }

  // Méthode pour afficher un sweetalert2 après vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  champsRemplis(): boolean {
    return (
      this.date !== "" &&
      this.anneeAcademic !== "" &&
      this.semestre !== "" &&
      this.classe !== "" &&
      this.matiere !== "" &&
      this.type !== ""
    );
  }

  annulerProgrammation() {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez annuler votre Programmation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'annule!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierChamps("programmation annulée!", "", "success");
        this.viderChamps();
      }
    });
  }

  validationChamps() {
    if (!this.champsRemplis()) {
      // Affiche l'alerte d'erreur si au moins un champ est vide
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs',
      });
    } else {
      // Affiche l'alerte de succès si tous les champs sont remplis
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Programmation faite avec succès',
      });

      let whoProgramme = {
        idEvaluation: this.tabEvaluation.length + 1,
        anneeAcademic: this.anneeAcademic,
        semestre: this.semestre,
        classe: this.classe,
        date: this.date,
        matiere: this.matiere,
        type: this.type,
      };

      // on cree l'Evaluation
      this.tabEvaluation.push(whoProgramme);
      console.log(this.tabEvaluation);
      localStorage.setItem("Eval", JSON.stringify(this.tabEvaluation));
      // let userExist = this.tabUsers.find((element:any)=>element.email ==this.email);

      // permet de remettre le formulaire à zéro
      this.viderChamps();

      // Redirect to Liste Evaluations page
      this.router.navigate(['/liste-Evaluations']);
    }
  }
}
