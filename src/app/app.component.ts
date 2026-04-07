import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'AUTH-1';
  private auth = inject(AuthService);
  ngOnInit() {
    this.auth.autoLogin();

    this.auth.checkUser().subscribe({
      error: (err) => {
        if (err.error.error.message === 'USER_DISABLED') {
          this.auth.logout();
        }
      },
    });
  }
}
