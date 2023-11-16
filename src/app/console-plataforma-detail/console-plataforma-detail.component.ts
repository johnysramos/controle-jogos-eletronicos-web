import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsolePlataforma } from '../model/console-plataforma';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsolePlataformaService } from '../services/consolePlataforma.service';

@Component({
  selector: 'app-console-plataforma-detail',
  templateUrl: './console-plataforma-detail.component.html',
  styleUrls: ['./console-plataforma-detail.component.css'],
})
export class ConsolePlataformaDetailComponent implements OnInit {
  consolePlataforma: ConsolePlataforma = {
    id: undefined,
    nome: undefined,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consolePlataformaService: ConsolePlataformaService
  ) {}

  ngOnInit() {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    if (idParam && idParam > 0) {
      this.consolePlataformaService.getById(idParam).subscribe({
        next: (data) => {
          this.consolePlataforma = data;
          console.log('OnInit', this.consolePlataforma);
        },
        error: (error) => alert(error.message),
      });
    }
  }

  async onSave() {
    console.log('onSave');
    this.consolePlataformaService.save(this.consolePlataforma).subscribe({
      next: async (data) => {
        await this.router.navigate(['/consoles-plataformas/detalhe', data.id]);
        this.ngOnInit();
        alert('Console/plataforma salvo com sucesso');
      },
      error: (error) => alert(error.message),
    });
  }

  async onDelete() {
    if (
      window.confirm('Tem certeza que deseja remover esse console/plataforma?')
    ) {
      this.consolePlataformaService.delete(this.consolePlataforma).subscribe({
        next: () => {
          alert('Console/plataforma deletado com sucesso');
          this.router.navigate(['/consoles-plataformas']);
        },
        error: (error) => alert(error.message),
      });
    }
  }
}
