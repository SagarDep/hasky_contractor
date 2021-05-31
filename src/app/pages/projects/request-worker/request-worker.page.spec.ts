import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWorkerPage } from './request-worker.page';

describe('RequestWorkerPage', () => {
  let component: RequestWorkerPage;
  let fixture: ComponentFixture<RequestWorkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestWorkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
