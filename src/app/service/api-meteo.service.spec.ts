import { TestBed } from '@angular/core/testing';

import { ApiMeteoService } from './api-meteo.service';

describe('ApiMeteoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMeteoService = TestBed.get(ApiMeteoService);
    expect(service).toBeTruthy();
  });
});
