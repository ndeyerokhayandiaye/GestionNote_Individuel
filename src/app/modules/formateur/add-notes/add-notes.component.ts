import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apprenant } from 'src/app/models/apprenant';
import { Notes } from 'src/app/models/notes';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  listeEvaluation: any[] = [];
  apprenants: Apprenant[] = [];
  listeApprenants!: any[];
  selectedEvaluationId: number = -1; // Utilisation d'une valeur par défaut
  notes: { apprenant: Apprenant, note: number }[] = [];
  filteredApprenants: Apprenant[] = [];
  lesnotes!: Notes[];
  note!: number[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.listeEvaluation = JSON.parse(localStorage.getItem("Eval") || '[]');
    this.listeApprenants = JSON.parse(localStorage.getItem('apprenants') || '[]');
  }

  onSelectEvaluation() {
    if (this.selectedEvaluationId !== -1) {
      this.notes = this.listeApprenants
        .filter(apprenant => apprenant.id === this.selectedEvaluationId)
        .map(apprenant => ({ apprenant, note: 0 })); // Initialisez les notes à 0
    } else {
      console.error('selectedEvaluationId est -1. Impossible de filtrer les apprenants.');
    }
  }

  attribuerNotes() {
    let i = 0;
    for (let i = 0; i < this.listeApprenants.length; i++) {
      if (this.listeApprenants[i].note < 0 || this.listeApprenants[i].note > 20) {
        alert('Note invalide champs '+(i+1)) 
      } else {
        this.listeApprenants[i].note.push(this.listeApprenants[i].note);
        localStorage.setItem('apprenants', JSON.stringify(this.listeApprenants))
      }
    }
  }
}
