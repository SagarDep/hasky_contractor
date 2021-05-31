import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyPage } from './edit-company.page';

describe('EditCompanyPage', () => {
  let component: EditCompanyPage;
  let fixture: ComponentFixture<EditCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
