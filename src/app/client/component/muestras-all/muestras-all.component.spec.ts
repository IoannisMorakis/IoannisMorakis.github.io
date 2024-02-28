import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasAllComponent } from './muestras-all.component';

describe('MuestrasAllComponent', () => {
  let component: MuestrasAllComponent;
  let fixture: ComponentFixture<MuestrasAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuestrasAllComponent]
    });
    fixture = TestBed.createComponent(MuestrasAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
