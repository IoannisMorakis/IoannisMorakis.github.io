import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionNewComponent } from './unidad-produccion-new.component';

describe('UnidadProduccionNewComponent', () => {
  let component: UnidadProduccionNewComponent;
  let fixture: ComponentFixture<UnidadProduccionNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionNewComponent]
    });
    fixture = TestBed.createComponent(UnidadProduccionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
