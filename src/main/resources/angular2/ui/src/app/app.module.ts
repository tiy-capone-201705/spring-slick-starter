import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SlickDataService } from './slick-data/slick-data.service';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { SlickAutofocusDirective } from './slick-autofocus/slick-autofocus.directive';
import { LogoutComponent } from './logout/logout.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { UserListComponent } from './user-list/user-list.component';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    HeaderComponent,
    SlickAutofocusDirective,
    LogoutComponent,
    ChatInputComponent,
    UserListComponent,
    MessageListComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SlickDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
