import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { ActivatedRoute } from '@angular/router';
import { ConsolePlataforma } from '../model/console-plataforma';

@Component({
  selector: 'app-jogo-eletronico-detail',
  templateUrl: './jogo-eletronico-detail.component.html',
  styleUrls: ['./jogo-eletronico-detail.component.css'],
})
export class JogoEletronicoDetailComponent implements OnInit, AfterViewInit {
  dataCompra?: string;
  jogoEletronico!: JogoEletronico;
  consolePlataformas?: ConsolePlataforma[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    if (idParam) {
      JogoEletronico.getJogosEletronicos().forEach(El => {
        if (idParam == El.id) {
          this.jogoEletronico = El;
        }
      });

      this.dataCompra = this.jogoEletronico.dataCompra.toLocaleDateString();
    }

    // inicializa seletor de consoles/plataformas
    this.consolePlataformas = ConsolePlataforma.getConsolePlataformas();
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
    });
  }

  onClick() {
  }
}
