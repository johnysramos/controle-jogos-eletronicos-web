import { Component, OnInit } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogos-eletronicos',
  templateUrl: './jogos-eletronicos.component.html',
  styleUrls: ['./jogos-eletronicos.component.css'],
})
export class JogosEletronicosComponent implements OnInit {
  jogosEletronicos: JogoEletronico[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.jogosEletronicos = JogoEletronico.getJogosEletronicos();
  }

  onNovo() {
    this.router.navigate(['/jogos-eletronicos/detalhe', -1]);
  }

  onClickJogoEletronico(jogoEletronico: JogoEletronico) {
    this.router.navigate(['/jogos-eletronicos/detalhe', jogoEletronico?.id]);
  }
}
