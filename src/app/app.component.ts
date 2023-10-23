import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controle-jogos-eletronicos-web';
  anoAtual = new Date().getFullYear();

  meuOutput(Event: any) {
    console.log(Event);
  }

  onClickAno(Event: any) {
    console.log(Event);
  }
}
