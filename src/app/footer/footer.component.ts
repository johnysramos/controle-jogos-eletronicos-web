import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input()
  anoAtual?: string | number;

  @Output()
  output = new EventEmitter();

  onClick() {
    this.output.emit(this.anoAtual);
  }
}
