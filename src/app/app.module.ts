import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { JogosEletronicosComponent } from './jogos-eletronicos/jogos-eletronicos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    JogosEletronicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
