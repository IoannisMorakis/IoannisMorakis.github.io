import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionInfoComponent } from './unidad-produccion-info.component';

describe('UnidadProduccionInfoComponent', () => {
  let component: UnidadProduccionInfoComponent;
  let fixture: ComponentFixture<UnidadProduccionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionInfoComponent]
    });
    fixture = TestBed.createComponent(UnidadProduccionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
