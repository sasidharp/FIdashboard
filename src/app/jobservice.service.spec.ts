import { TestBed, inject } from '@angular/core/testing';

import { JobserviceService } from './jobservice.service';

describe('JobserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobserviceService]
    });
  });

  it('should be created', inject([JobserviceService], (service: JobserviceService) => {
    expect(service).toBeTruthy();
  }));
});
