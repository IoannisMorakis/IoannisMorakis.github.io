import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEditComponent } from './perfil-edit.component';

describe('PerfilEditComponent', () => {
  let component: PerfilEditComponent;
  let fixture: ComponentFixture<PerfilEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilEditComponent]
    });
    fixture = TestBed.createComponent(PerfilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
