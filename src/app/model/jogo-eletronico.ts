import { ConsolePlataforma } from './console-plataforma';

export class JogoEletronico {
  id: number | undefined;
  titulo: string | undefined;
  dataCompra: Date | undefined;
  consolePlataforma: ConsolePlataforma | undefined;
  estadoConservacao: EstadoConservacao | undefined;
  midia: Midia | undefined;

  constructor(
    titulo: string,
    dataCompra: Date,
    consolePlataforma: ConsolePlataforma,
    estadoConservacao: EstadoConservacao,
    midia: Midia
  ) {
    this.titulo = titulo;
    this.dataCompra = dataCompra;
    this.consolePlataforma = consolePlataforma;
    this.estadoConservacao = estadoConservacao;
    this.midia = midia;
  }

  static getJogosEletronicos() {
    const JogosEletronicosTest: JogoEletronico[] = [
      {
        id: 1,
        titulo: 'Resident Evil 2',
        dataCompra: new Date(2010, 6, 6),
        consolePlataforma: ConsolePlataforma.getConsolePlataformas()[0],
        estadoConservacao: EstadoConservacao.USADO,
        midia: Midia.FISICA,
      },
      {
        id: 2,
        titulo: 'Dota 2',
        dataCompra: new Date(2015, 10, 6),
        consolePlataforma: ConsolePlataforma.getConsolePlataformas()[2],
        estadoConservacao: EstadoConservacao.NAO_SE_APLICA,
        midia: Midia.DIGITAL,
      },
      {
        id: 3,
        titulo: 'Gears of War',
        dataCompra: new Date(2018, 10, 5),
        consolePlataforma: ConsolePlataforma.getConsolePlataformas()[1],
        estadoConservacao: EstadoConservacao.NOVO,
        midia: Midia.FISICA,
      },
    ];

    return JogosEletronicosTest;
  }
}

export enum Midia {
  FISICA = 'Física',
  DIGITAL = 'Digital',
}

export enum EstadoConservacao {
  NOVO = 'Novo',
  USADO = 'Usado',
  NAO_SE_APLICA = 'Não se aplica',
}

