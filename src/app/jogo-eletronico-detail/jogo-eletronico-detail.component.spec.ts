import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoEletronicoDetailComponent } from './jogo-eletronico-detail.component';

describe('JogoEletronicoDetailComponent', () => {
  let component: JogoEletronicoDetailComponent;
  let fixture: ComponentFixture<JogoEletronicoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JogoEletronicoDetailComponent]
    });
    fixture = TestBed.createComponent(JogoEletronicoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
