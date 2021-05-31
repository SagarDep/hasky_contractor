import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojectsPage } from './createprojects.page';

describe('CreateprojectsPage', () => {
  let component: CreateprojectsPage;
  let fixture: ComponentFixture<CreateprojectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprojectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprojectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
