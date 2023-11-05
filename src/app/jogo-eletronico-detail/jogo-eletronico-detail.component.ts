import { EstadoConservacao, Midia } from './../model/jogo-eletronico';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsolePlataforma } from '../model/console-plataforma';
import { NgForm } from '@angular/forms';
import { JogoEletronicoService } from '../services/jogoEletronico.service';
import { ConsolePlataformaService } from '../services/consolePlataforma.service';

@Component({
  selector: 'app-jogo-eletronico-detail',
  templateUrl: './jogo-eletronico-detail.component.html',
  styleUrls: ['./jogo-eletronico-detail.component.css'],
})
export class JogoEletronicoDetailComponent implements OnInit {
  dataCompra: string | undefined = new Date().toLocaleDateString();
  jogoEletronico: JogoEletronico = {
    id: undefined,
    titulo: undefined,
    dataCompra: undefined,
    consolePlataforma: undefined,
    estadoConservacao: undefined,
    midia: undefined,
  };

  consolesPlataformas: ConsolePlataforma[] = [];

  @ViewChild('form') form!: NgForm;
  @ViewChild('ConsolePlataformaSelect') ConsolePlataformaSelect!: ElementRef;

  @ViewChild('RadioEstadoNovo') RadioEstadoNovo!: ElementRef;
  @ViewChild('RadioEstadoUsado') RadioEstadoUsado!: ElementRef;
  @ViewChild('RadioEstadoNaoSeAplica') RadioEstadoNaoSeAplica!: ElementRef;

  @ViewChild('RadioMidiaFisica') RadioMidiaFisica!: ElementRef;
  @ViewChild('RadioMidiaDigital') RadioMidiaDigital!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jogoEletronicoService: JogoEletronicoService,
    private consolePlataformaService: ConsolePlataformaService
  ) {}

  async ngOnInit() {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    console.log('idParam', idParam);

    if (idParam && idParam > 0) {
      /*JogoEletronico.getJogosEletronicos().forEach((El) => {
        if (idParam == El.id) {
          this.jogoEletronico = El;
        }
      });*/

      this.jogoEletronico = await this.jogoEletronicoService.getById(idParam);
      console.log(this.jogoEletronico);

      this.dataCompra = this.jogoEletronico.dataCompra?.toLocaleDateString();
    }

    this.listConsolesPlataformas();
    this.inicializaRadioButtonEstado();
    this.inicializaRadioButtonMidia();
  }

  async listConsolesPlataformas() {
    this.consolesPlataformas = await this.consolePlataformaService.findAll();
    setTimeout(() => {
      M.FormSelect.init(this.ConsolePlataformaSelect.nativeElement);
    }, 100);
  }

  compareConsolePlataforma(cp1: ConsolePlataforma, cp2: ConsolePlataforma) {
    return cp1?.id == cp2?.id;
  }

  async onSave() {
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

    localStorage.setItem(
      'EntidadeJogoEletronico',
      JSON.stringify(this.jogoEletronico)
    );

    let _EntidadeJogoEletronico = localStorage.getItem(
      'EntidadeJogoEletronico'
    );

    if (_EntidadeJogoEletronico) {
      console.log(JSON.parse(_EntidadeJogoEletronico));
    }

    let retorno = await this.jogoEletronicoService.save(this.jogoEletronico);

    if (retorno) {
      window.alert('Jogo salvo com sucesso');
    }
  }

  async onDelete() {
    if (window.confirm('Tem certeza que deseja remover esse jogo?')) {
      let retorno = await this.jogoEletronicoService.delete(
        this.jogoEletronico
      );

      if (retorno) {
        this.router.navigate(['/jogos-eletronicos']);
        window.alert('Jogo deletado com sucesso');
      }
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
