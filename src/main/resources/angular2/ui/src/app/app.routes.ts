import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'messages/:userName/:server', component: MessagesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
