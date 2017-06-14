import { TestBed, inject } from '@angular/core/testing';

import { SlickDataService } from './slick-data.service';

describe('SlickDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlickDataService]
    });
  });

  it('should be created', inject([SlickDataService], (service: SlickDataService) => {
    expect(service).toBeTruthy();
  }));
});
