import { TestBed } from '@angular/core/testing';

import { MoreProductsService } from './more-products.service';

describe('MoreProductsService', () => {
  let service: MoreProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
