import { TestBed } from '@angular/core/testing';

import { SudokuGeneratorService } from './sudoku-generator.service';

describe('SudokuGeneratorService', () => {
  let service: SudokuGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
