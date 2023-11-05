import { Component, OnInit } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { Router } from '@angular/router';
import { JogoEletronicoService } from '../services/jogoEletronico.service';

@Component({
  selector: 'app-jogos-eletronicos',
  templateUrl: './jogos-eletronicos.component.html',
  styleUrls: ['./jogos-eletronicos.component.css'],
})
export class JogosEletronicosComponent implements OnInit {
  jogosEletronicos: JogoEletronico[] = [];
  ultimoJogoDeletado?: JogoEletronico;

  constructor(
    private router: Router,
    private jogoEletronicoService: JogoEletronicoService
  ) {}

  async ngOnInit() {
    this.jogosEletronicos = await this.jogoEletronicoService.findAll();
    this.ultimoJogoDeletado = this.jogoEletronicoService.ultimoJogoDeletado;
  }

  onNovo() {
    this.router.navigate(['/jogos-eletronicos/detalhe', -1]);
  }

  onClickJogoEletronico(jogoEletronico: JogoEletronico) {
    this.router.navigate(['/jogos-eletronicos/detalhe', jogoEletronico?.id]);
  }

  async onRestaurar() {
    console.log('ultimoJogoDeletado', this.ultimoJogoDeletado);

    if (this.ultimoJogoDeletado) {
      let retorno = await this.jogoEletronicoService.save(this.ultimoJogoDeletado, true);

      if (retorno) {
        this.jogosEletronicos = await this.jogoEletronicoService.findAll();
        this.ultimoJogoDeletado = this.jogoEletronicoService.ultimoJogoDeletado;
      }
    }
  }
}
