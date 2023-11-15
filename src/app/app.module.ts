import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { JogosEletronicosComponent } from './jogos-eletronicos/jogos-eletronicos.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { JogoEletronicoDetailComponent } from './jogo-eletronico-detail/jogo-eletronico-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    JogosEletronicosComponent,
    FooterComponent,
    HomeComponent,
    JogoEletronicoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskDirective, NgxMaskPipe,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
