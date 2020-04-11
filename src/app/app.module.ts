import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { TeamService } from './services/team.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PlayerService,
    TeamService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
