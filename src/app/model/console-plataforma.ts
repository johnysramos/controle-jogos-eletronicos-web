export class ConsolePlataforma {
  id: number | undefined;
  nome: string | undefined;

  constructor(nome: string) {
    this.nome = nome;
  }

  /*static getConsolePlataformas() {
    const ConsolePlataformaTest: ConsolePlataforma[] = [
      {
        id: 1,
        nome: 'Playstation 1'
      },
      {
        id: 2,
        nome: 'Xbox 360'
      },
      {
        id: 3,
        nome: 'Computador'
      },
    ];

    return ConsolePlataformaTest;
  }*/
}
