import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JogosEletronicosComponent } from './jogos-eletronicos/jogos-eletronicos.component';
import { JogoEletronicoDetailComponent } from './jogo-eletronico-detail/jogo-eletronico-detail.component';
import { ConsolesPlataformasComponent } from './consoles-plataformas/consoles-plataformas.component';
import { ConsolePlataformaDetailComponent } from './console-plataforma-detail/console-plataforma-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'jogos-eletronicos',
    component: JogosEletronicosComponent,
  },
  {
    path: 'jogos-eletronicos/detalhe/:id',
    component: JogoEletronicoDetailComponent,
  },
  { path: 'consoles-plataformas', component: ConsolesPlataformasComponent },
  {
    path: 'consoles-plataformas/detalhe/:id',
    component: ConsolePlataformaDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
