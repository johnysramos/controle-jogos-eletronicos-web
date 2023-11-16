import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolesPlataformasComponent } from './consoles-plataformas.component';

describe('ConsolesPlataformasComponent', () => {
  let component: ConsolesPlataformasComponent;
  let fixture: ComponentFixture<ConsolesPlataformasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolesPlataformasComponent]
    });
    fixture = TestBed.createComponent(ConsolesPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
