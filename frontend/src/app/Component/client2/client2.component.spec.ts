import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client2Component } from './client2.component';

describe('Client2Component', () => {
  let component: Client2Component;
  let fixture: ComponentFixture<Client2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client2Component]
    });
    fixture = TestBed.createComponent(Client2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
