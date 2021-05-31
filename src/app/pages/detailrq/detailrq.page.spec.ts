import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailrqPage } from './detailrq.page';

describe('DetailrqPage', () => {
  let component: DetailrqPage;
  let fixture: ComponentFixture<DetailrqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailrqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailrqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
