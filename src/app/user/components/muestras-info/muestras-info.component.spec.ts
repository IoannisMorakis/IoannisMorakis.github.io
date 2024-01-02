import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasInfoComponent } from './muestras-info.component';

describe('MuestrasInfoComponent', () => {
  let component: MuestrasInfoComponent;
  let fixture: ComponentFixture<MuestrasInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuestrasInfoComponent]
    });
    fixture = TestBed.createComponent(MuestrasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
