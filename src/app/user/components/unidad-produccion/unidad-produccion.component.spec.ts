import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionComponent } from './unidad-produccion.component';

describe('UnidadProduccionComponent', () => {
  let component: UnidadProduccionComponent;
  let fixture: ComponentFixture<UnidadProduccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionComponent]
    });
    fixture = TestBed.createComponent(UnidadProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
