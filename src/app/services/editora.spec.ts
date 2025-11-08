import { TestBed } from '@angular/core/testing';

import { Editora } from './editora';

describe('Editora', () => {
  let service: Editora;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Editora);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
