import { TestBed } from '@angular/core/testing';

import { ViaticoService } from './viatico.service';

describe('ViaticoService', () => {
  let service: ViaticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
