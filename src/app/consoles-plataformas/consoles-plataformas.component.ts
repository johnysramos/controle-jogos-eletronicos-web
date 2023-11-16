import { Component, OnInit } from '@angular/core';
import { ConsolePlataforma } from '../model/console-plataforma';
import { Router } from '@angular/router';
import { ConsolePlataformaService } from '../services/consolePlataforma.service';

@Component({
  selector: 'app-consoles-plataformas',
  templateUrl: './consoles-plataformas.component.html',
  styleUrls: ['./consoles-plataformas.component.css'],
})
export class ConsolesPlataformasComponent implements OnInit {
  consolesPlataformas: ConsolePlataforma[] = [];
  ultimoJogoDeletado?: ConsolePlataforma;

  constructor(
    private router: Router,
    private consolePlataformaService: ConsolePlataformaService
  ) {}

  async ngOnInit() {
    this.consolePlataformaService.findAll().subscribe({
      next: (data) => (this.consolesPlataformas = data),
      error: (error) => alert(error.message),
    });
  }

  onNovo() {
    this.router.navigate(['/consoles-plataformas/detalhe', -1]);
  }

  onClickConsolePlataforma(consolePlataforma: ConsolePlataforma) {
    this.router.navigate([
      '/consoles-plataformas/detalhe',
      consolePlataforma?.id,
    ]);
  }
}
