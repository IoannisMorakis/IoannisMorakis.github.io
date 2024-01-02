import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsInfoComponent } from './clients-info.component';

describe('ClientsInfoComponent', () => {
  let component: ClientsInfoComponent;
  let fixture: ComponentFixture<ClientsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsInfoComponent]
    });
    fixture = TestBed.createComponent(ClientsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
