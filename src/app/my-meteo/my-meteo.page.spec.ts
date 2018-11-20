import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeteoPage } from './my-meteo.page';

describe('MyMeteoPage', () => {
  let component: MyMeteoPage;
  let fixture: ComponentFixture<MyMeteoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMeteoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMeteoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
