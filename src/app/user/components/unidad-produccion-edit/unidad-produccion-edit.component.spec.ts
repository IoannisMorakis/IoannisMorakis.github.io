import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionEditComponent } from './unidad-produccion-edit.component';

describe('UnidadProduccionEditComponent', () => {
  let component: UnidadProduccionEditComponent;
  let fixture: ComponentFixture<UnidadProduccionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionEditComponent]
    });
    fixture = TestBed.createComponent(UnidadProduccionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
