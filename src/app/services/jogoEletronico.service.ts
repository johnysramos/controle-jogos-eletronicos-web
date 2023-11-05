import { ConsolePlataformaService } from './consolePlataforma.service';
import { Injectable } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';

@Injectable({
  providedIn: 'root',
})
export class JogoEletronicoService {
  URL = 'http://localhost:3000/jogosEletronicos';

  ultimoJogoDeletado?: JogoEletronico;

  constructor(private consolePlataformaService: ConsolePlataformaService) {}

  async getById(id: number): Promise<JogoEletronico> {
    let response = await fetch(`${this.URL}/${id}`);
    let data = await response.json();

    data.consolePlataforma = await this.consolePlataformaService.getById(
      data.consolesPlataformaId
    );

    data.dataCompra = new Date(
      data.dataCompra.split('-')[0],
      data.dataCompra.split('-')[1] - 1,
      data.dataCompra.split('-')[2]
    );

    return data;
  }

  async findAll(): Promise<JogoEletronico[]> {
    let response = await fetch(`${this.URL}`);

    let data = await response.json();

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].consolePlataforma = await this.consolePlataformaService.getById(
          data[i].consolesPlataformaId
        );
        data[i].dataCompra = new Date(
          data[i].dataCompra.split('-')[0],
          data[i].dataCompra.split('-')[1] - 1,
          data[i].dataCompra.split('-')[2]
        );
      }
    }

    return data;
  }

  async save(jogoEletronico: JogoEletronico, ultimoDeletado?: boolean): Promise<JogoEletronico> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');

    if (ultimoDeletado) {
      this.ultimoJogoDeletado = undefined;
      jogoEletronico.id = undefined;
    }

    let _data = {
      titulo: jogoEletronico.titulo,
      dataCompra:
        jogoEletronico.dataCompra?.getFullYear() +
        '-' +
        (jogoEletronico.dataCompra
          ? jogoEletronico.dataCompra?.getMonth() + 1
          : 1) +
        '-' +
        jogoEletronico.dataCompra?.getDate(),
      consolesPlataformaId: jogoEletronico.consolePlataforma?.id,
      estadoConservacao: jogoEletronico.estadoConservacao?.toString(),
      midia: jogoEletronico.midia?.toString(),
    };

    let raw = JSON.stringify(_data);

    let requestOptions = {
      method: jogoEletronico.id ? 'PUT' : 'POST',
      headers: header,
      body: raw,
    };

    let response = await fetch(
      jogoEletronico.id ? `${this.URL}/${jogoEletronico.id}` : this.URL,
      requestOptions
    );

    let _retorno = await response.json();

    _retorno.consolePlataforma = await this.consolePlataformaService.getById(
      _retorno.consolesPlataformaId
    );

    _retorno.dataCompra = new Date(
      _retorno.dataCompra.split('-')[0],
      _retorno.dataCompra.split('-')[1] - 1,
      _retorno.dataCompra.split('-')[2]
    );

    return _retorno;
  }

  async delete(jogoEletronico: JogoEletronico) {
    // Gravamos o ultimo jogo deletado
    this.ultimoJogoDeletado = jogoEletronico;

    let requestOptions = {
      method: 'DELETE',
    };

    let response = await fetch(`${this.URL}/${jogoEletronico.id}`, requestOptions);

    let retorno = await response.json();

    return retorno;
  }
}
