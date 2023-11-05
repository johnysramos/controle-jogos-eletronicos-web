import { Injectable } from '@angular/core';
import { ConsolePlataforma } from '../model/console-plataforma';

@Injectable({
  providedIn: 'root',
})
export class ConsolePlataformaService {
  URL = 'http://localhost:3000/consolesPlataformas';

  constructor() {}

  async getById(id: number): Promise<ConsolePlataforma> {
    let response = await fetch(`${this.URL}/${id}`);

    return await response.json();
  }

  async findAll() : Promise<ConsolePlataforma[]> {
    let response = await fetch(`${this.URL}`);

    return await response.json();
  }
}
