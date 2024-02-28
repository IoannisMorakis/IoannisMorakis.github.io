import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasNewComponent } from './muestras-new.component';

describe('MuestrasNewComponent', () => {
  let component: MuestrasNewComponent;
  let fixture: ComponentFixture<MuestrasNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuestrasNewComponent]
    });
    fixture = TestBed.createComponent(MuestrasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
