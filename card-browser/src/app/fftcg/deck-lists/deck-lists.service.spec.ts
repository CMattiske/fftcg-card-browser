import { TestBed } from '@angular/core/testing';

import { DeckListsService } from './deck-lists.service';

describe('DeckListsService', () => {
  let service: DeckListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
