import { Injectable } from '@angular/core';
import { ConsolePlataforma } from '../model/console-plataforma';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorUtil } from '../utils/error-util';

@Injectable({
  providedIn: 'root',
})
export class ConsolePlataformaService {
  URL = 'http://localhost:3000/consolesPlataformas';

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<ConsolePlataforma> {
    return this.httpClient
      .get<ConsolePlataforma>(`${this.URL}/${id}`)
      .pipe(catchError(ErrorUtil.handleError));
  }

  async findAll(): Promise<ConsolePlataforma[]> {
    let response = await fetch(`${this.URL}`);

    return await response.json();
  }
}
