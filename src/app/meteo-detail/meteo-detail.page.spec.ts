import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoDetailPage } from './meteo-detail.page';

describe('MeteoDetailPage', () => {
  let component: MeteoDetailPage;
  let fixture: ComponentFixture<MeteoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
