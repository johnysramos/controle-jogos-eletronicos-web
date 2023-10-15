import { Component } from '@angular/core';

@Component({
  selector: 'app-jogos-eletronicos',
  templateUrl: './jogos-eletronicos.component.html',
  styleUrls: ['./jogos-eletronicos.component.css'],
})
export class JogosEletronicosComponent {
  Operacao = Operacao.READ;
  ModoTela = ModoTela.GRID;

  DataAtual = new Date();

  RS: any = {};

  onNovo() {
    this.ModoTela = ModoTela.FORMULARIO;
    this.Operacao = Operacao.CREATE;
  }

  onBack() {
    this.ModoTela = ModoTela.GRID;
    this.Operacao = Operacao.READ;
  }

  onSave() {
    window.alert(JSON.stringify(this.RS));
  }
}

export enum Operacao {
  CREATE = 'C',
  READ = 'R',
  UPDATE = 'U',
  DELETE = 'D',
}

export enum ModoTela {
  GRID = 'G',
  FORMULARIO = 'F',
}
