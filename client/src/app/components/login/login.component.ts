import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  password1: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.loginToServer(this.correo, this.password1).subscribe(response => {
      if ((<any>response).success) {
          this.authService.setLoggendInStatus(true);
          this.authService.setCurrentUser((<any>response).usuario);
          console.log("login" +(<any>response))
          this.router.navigate(['/gestion']);
      } else {
          // Aquí puedes mostrar un mensaje de error si el inicio de sesión no es exitoso.
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
  });
}

}
