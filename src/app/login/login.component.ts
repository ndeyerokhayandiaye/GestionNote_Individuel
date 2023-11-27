import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mail!: string;
  password!: string;
  formateurs!: any[];

  constructor(private router:Router){

  }
  ngOnInit(): void {
    this.formateurs = JSON.parse(localStorage.getItem('professeurs') || '[]');
  }
  connexion() {
    if (!this.password || !this.mail) {
      Swal.fire({
        title: 'erreur',
        text: 'Veilez remplir toutes les champs',
        icon: 'error'
      })
    } 
    if (this.password == 'adminpassword' && this.mail == 'admin@gmail.com') {
      this.router.navigate(['admin']);
    }
    else {
      this.formateurs.forEach(element => {
        if (element.mail == this.mail && this.password == 'adminpassword') {
          this.router.navigate(['formateur']);
        } 
      });
    } 
  }
}