import { ConsolePlataformaService } from './consolePlataforma.service';
import { Injectable } from '@angular/core';
import { JogoEletronico } from '../model/jogo-eletronico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { ErrorUtil } from '../utils/error-util';

@Injectable({
  providedIn: 'root',
})
export class JogoEletronicoService {
  URL = 'http://localhost:3000/jogosEletronicos';

  ultimoJogoDeletado?: JogoEletronico;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private consolePlataformaService: ConsolePlataformaService,
    private httpClient: HttpClient
  ) {}

  getById(id: number): Observable<JogoEletronico> {
    return this.httpClient.get<JogoEletronico>(`${this.URL}/${id}`).pipe(
      map((data) => {
        if (data && data.dataCompra) {
          data.dataCompra = new Date(
            Number(data.dataCompra.toString().split('-')[0]),
            Number(data.dataCompra.toString().split('-')[1]) - 1,
            Number(data.dataCompra.toString().split('-')[2])
          );
        }

        this.consolePlataformaService
          .getById((data as any).consolesPlataformaId)
          .subscribe({
            next: (value) => (data.consolePlataforma = value),
          });

        return data;
      }),
      catchError(ErrorUtil.handleError)
    );
  }

  findall(): Observable<JogoEletronico[]> {
    return this.httpClient.get<JogoEletronico[]>(`${this.URL}`).pipe(
      map((data) => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.consolePlataformaService
              .getById((data[i] as any).consolesPlataformaId)
              .subscribe({
                next: (value) => (data[i].consolePlataforma = value),
              });

            if (data[i] && data[i].dataCompra) {
              data[i].dataCompra = new Date(
                Number(data[i].dataCompra?.toString().split('-')[0]),
                Number(data[i].dataCompra?.toString().split('-')[1]) - 1,
                Number(data[i].dataCompra?.toString().split('-')[2])
              );
            }
          }
        }

        return data;
      }),
      catchError(ErrorUtil.handleError)
    );
  }

  save(
    jogoEletronico: JogoEletronico,
    ultimoDeletado?: boolean
  ): Observable<JogoEletronico> {
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

    if (jogoEletronico.id) {
      return this.httpClient
        .put<JogoEletronico>(
          `${this.URL}/${jogoEletronico.id}`,
          _data,
          this.httpOptions
        )
        .pipe(
          mergeMap((data) => {
            if (data.id) {
              return this.getById(data.id);
            }
            return of(data);
          }),
          catchError(ErrorUtil.handleError)
        );
    } else {
      return this.httpClient
        .post<JogoEletronico>(`${this.URL}`, _data, this.httpOptions)
        .pipe(
          mergeMap((data) => {
            if (data.id) {
              return this.getById(data.id);
            }
            return of(data);
          }),
          catchError(ErrorUtil.handleError)
        );
    }
  }

  delete(jogoEletronico: JogoEletronico): Observable<any> {
    // Gravamos o ultimo jogo deletado
    this.ultimoJogoDeletado = jogoEletronico;

    return this.httpClient
      .delete(`${this.URL}/${jogoEletronico.id}`)
      .pipe(catchError(ErrorUtil.handleError));
  }
}
