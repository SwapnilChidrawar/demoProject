import { TestBed, inject } from '@angular/core/testing';

import { NgtableService } from './ngtable.service';

describe('NgtableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgtableService]
    });
  });

  it('should be created', inject([NgtableService], (service: NgtableService) => {
    expect(service).toBeTruthy();
  }));
});
