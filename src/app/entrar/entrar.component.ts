import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0,0)
  }

  /* forma antiga, depreciada
  logar() {
    this.auth.logar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{
      this.usuarioLogin = resp;
      alert('Logado com sucesso');

      this.router.navigate(['/inicio']); 
    },
    error => {
      if(error.status = 401){
        alert('Usuário e/ou senha inválidos')
      }
    });
  } */

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        alert('Usuário logado com sucesso');

        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.token = this.usuarioLogin.token;
        environment.foto = this.usuarioLogin.foto;
        environment.usuario = this.usuarioLogin.usuario;
        environment.tipo = this.usuarioLogin.tipo;
        
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        if ((error.status = 401)) {
          alert('Usuário e/ou senha inválidos');
        }
      },
    });
  }
}
