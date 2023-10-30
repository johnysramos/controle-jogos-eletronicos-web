import { EstadoConservacao, Midia } from './../model/jogo-eletronico';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { ActivatedRoute } from '@angular/router';
import { ConsolePlataforma } from '../model/console-plataforma';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-jogo-eletronico-detail',
  templateUrl: './jogo-eletronico-detail.component.html',
  styleUrls: ['./jogo-eletronico-detail.component.css'],
})
export class JogoEletronicoDetailComponent implements OnInit {
  dataCompra?: string;
  jogoEletronico!: JogoEletronico;

  consolesPlataformas: ConsolePlataforma[] = [];

  @ViewChild('form') form!: NgForm;
  @ViewChild('ConsolePlataformaSelect') ConsolePlataformaSelect!: ElementRef;

  @ViewChild('RadioEstadoNovo') RadioEstadoNovo!: ElementRef;
  @ViewChild('RadioEstadoUsado') RadioEstadoUsado!: ElementRef;
  @ViewChild('RadioEstadoNaoSeAplica') RadioEstadoNaoSeAplica!: ElementRef;

  @ViewChild('RadioMidiaFisica') RadioMidiaFisica!: ElementRef;
  @ViewChild('RadioMidiaDigital') RadioMidiaDigital!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    if (idParam && idParam > 0) {
      JogoEletronico.getJogosEletronicos().forEach((El) => {
        if (idParam == El.id) {
          this.jogoEletronico = El;
        }
      });

      this.dataCompra = this.jogoEletronico.dataCompra?.toLocaleDateString();
    }
    else {
      this.jogoEletronico = {
        id: undefined,
        titulo: undefined,
        dataCompra: undefined,
        consolePlataforma: undefined,
        estadoConservacao: undefined,
        midia: undefined
      };

      this.dataCompra = new Date().toLocaleDateString();
    }

    this.listConsolesPlataformas();
    this.inicializaRadioButtonEstado();
    this.inicializaRadioButtonMidia();

  }

  listConsolesPlataformas() {
    this.consolesPlataformas = ConsolePlataforma.getConsolePlataformas();
    setTimeout(() => {
      M.FormSelect.init(this.ConsolePlataformaSelect.nativeElement);
    }, 100);
  }

  compareConsolePlataforma(cp1: ConsolePlataforma, cp2: ConsolePlataforma) {
      return cp1?.id == cp2?.id;
  }

  onSave() {
    console.log('this.jogoEletronico', this.jogoEletronico);
    console.log('dataCompra', this.dataCompra);

    // Convert data da compra
    this.jogoEletronico.dataCompra = new Date(
      this.dataCompra ? Number(this.dataCompra.split('/')[2]) : 0,
      this.dataCompra ? Number(this.dataCompra?.split('/')[1]) - 1 : 0,
      this.dataCompra ? Number(this.dataCompra?.split('/')[0]) : 0
    );

    // Convert estado de conservação
    if (this.RadioEstadoNovo.nativeElement.checked) {
      this.jogoEletronico.estadoConservacao = EstadoConservacao.NOVO;
    } else if (this.RadioEstadoUsado.nativeElement.checked) {
      this.jogoEletronico.estadoConservacao = EstadoConservacao.USADO;
    } else {
      this.jogoEletronico.estadoConservacao = EstadoConservacao.NAO_SE_APLICA;
    }

    // Convert midia
    if (this.RadioMidiaDigital.nativeElement.checked) {
      this.jogoEletronico.midia = Midia.DIGITAL;
    } else {
      this.jogoEletronico.midia = Midia.FISICA;
    }

    localStorage.setItem('EntidadeJogoEletronico', JSON.stringify(this.jogoEletronico));

    let _EntidadeJogoEletronico =  localStorage.getItem('EntidadeJogoEletronico');

    if (_EntidadeJogoEletronico) {
      console.log(JSON.parse(_EntidadeJogoEletronico));
    }
  }

  inicializaRadioButtonEstado() {
    setTimeout(() => {
      switch (this.jogoEletronico.estadoConservacao) {
        case EstadoConservacao.NOVO:
          this.RadioEstadoNovo.nativeElement.checked = true;
          break;

        case EstadoConservacao.USADO:
          this.RadioEstadoUsado.nativeElement.checked = true;
          break;

        case EstadoConservacao.NAO_SE_APLICA:
          this.RadioEstadoNaoSeAplica.nativeElement.checked = true;
          break;

        default:
          this.RadioEstadoNovo.nativeElement.checked = true;
          break;
      }
    }, 100);
  }

  inicializaRadioButtonMidia() {
    setTimeout(() => {
      switch (this.jogoEletronico.midia) {
        case Midia.DIGITAL:
          this.RadioMidiaDigital.nativeElement.checked = true;
          break;

        case Midia.FISICA:
          this.RadioMidiaFisica.nativeElement.checked = true;
          break;

        default:
          this.RadioMidiaFisica.nativeElement.checked = true;
          break;
      }
    }, 100);
  }
}
