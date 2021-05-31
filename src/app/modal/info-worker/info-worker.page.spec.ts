import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWorkerPage } from './info-worker.page';

describe('InfoWorkerPage', () => {
  let component: InfoWorkerPage;
  let fixture: ComponentFixture<InfoWorkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWorkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
