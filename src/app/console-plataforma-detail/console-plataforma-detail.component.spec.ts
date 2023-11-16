import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePlataformaDetailComponent } from './console-plataforma-detail.component';

describe('ConsolePlataformaDetailComponent', () => {
  let component: ConsolePlataformaDetailComponent;
  let fixture: ComponentFixture<ConsolePlataformaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolePlataformaDetailComponent]
    });
    fixture = TestBed.createComponent(ConsolePlataformaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
