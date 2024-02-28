import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionAllComponent } from './unidad-produccion-all.component';

describe('UnidadProduccionAllComponent', () => {
  let component: UnidadProduccionAllComponent;
  let fixture: ComponentFixture<UnidadProduccionAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionAllComponent]
    });
    fixture = TestBed.createComponent(UnidadProduccionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
