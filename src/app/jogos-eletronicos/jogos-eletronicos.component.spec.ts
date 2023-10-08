import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosEletronicosComponent } from './jogos-eletronicos.component';

describe('JogosEletronicosComponent', () => {
  let component: JogosEletronicosComponent;
  let fixture: ComponentFixture<JogosEletronicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JogosEletronicosComponent]
    });
    fixture = TestBed.createComponent(JogosEletronicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
