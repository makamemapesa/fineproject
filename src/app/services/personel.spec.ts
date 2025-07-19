import { TestBed } from '@angular/core/testing';

import { Personel } from './personel';

describe('Personel', () => {
  let service: Personel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Personel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
