import { Injectable } from '@angular/core';
import { ConsolePlataforma } from '../model/console-plataforma';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorUtil } from '../utils/error-util';
import { AppError } from '../utils/app-error';

@Injectable({
  providedIn: 'root',
})
export class ConsolePlataformaService {
  URL = 'http://localhost:3000/consolesPlataformas';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getById(id: number, parameters?: string): Observable<ConsolePlataforma> {
    return this.httpClient
      .get<ConsolePlataforma>(
        `${this.URL}/${id}${parameters ? '?' + parameters : ''}`
      )
      .pipe(catchError(ErrorUtil.handleError));
  }

  findAll(): Observable<ConsolePlataforma[]> {
    return this.httpClient
      .get<ConsolePlataforma[]>(`${this.URL}`)
      .pipe(catchError(ErrorUtil.handleError));
  }

  save(consolePlataforma: ConsolePlataforma): Observable<ConsolePlataforma> {
    if (consolePlataforma.id) {
      return this.httpClient
        .put<ConsolePlataforma>(
          `${this.URL}/${consolePlataforma.id}`,
          consolePlataforma,
          this.httpOptions
        )
        .pipe(catchError(ErrorUtil.handleError));
    } else {
      return this.httpClient
        .post<ConsolePlataforma>(
          `${this.URL}`,
          consolePlataforma,
          this.httpOptions
        )
        .pipe(catchError(ErrorUtil.handleError));
    }
  }

  delete(consolePlataforma: ConsolePlataforma): Observable<any> {
    // Verificamos se o console/plataforma está sendo usado por algum jogo
    return this.getById(
      Number(consolePlataforma.id),
      '_embed=jogosEletronicos'
    ).pipe(
      concatMap((data) => {
        let _data = JSON.parse(JSON.stringify(data));

        if (_data.jogosEletronicos && _data.jogosEletronicos.length > 0) {
          return throwError(
            () =>
              new AppError(
                'Console/plataforma não pode ser excluído pois está cadastrado em um ou mais jogos eletrônicos'
              )
          );
        } else {
          return this.httpClient.delete(`${this.URL}/${consolePlataforma.id}`);
        }
      }),
      catchError(ErrorUtil.handleError)
    );
  }
}
