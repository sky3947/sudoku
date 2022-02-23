import { Injectable } from '@angular/core';
import { Cell, DEFAULT_CELL, DEFAULT_CONCRETE, DEFAULT_NOTES, DEFAULT_VALUE } from './cell';

@Injectable({
  providedIn: 'root'
})
export class SudokuGeneratorService {

  constructor() { }

  /**
   * Creates a new cell with given parameters and returns it.
   * 
   * @param row The row index.
   * @param col The column index.
   * @param value The value in this cell. Defaults to 0.
   * @param concrete Whether or not this value was given (known to be true.)
   *        Defaults to true.
   * @param notes The notes written in this cell. Defaults to an array of nine
   *        elements, filled with false.
   * @returns The new Cell.
   */
  newCell(row: number, col: number, value?: number, concrete?: boolean, notes?: boolean[]): Cell {
    return {
      row: row,
      col: col,
      value: (typeof value === 'undefined' ? DEFAULT_VALUE : value),
      concrete: (typeof concrete === 'undefined' ? DEFAULT_CONCRETE : concrete),
      notes: (typeof notes === 'undefined' ? [...DEFAULT_NOTES] : notes),
    }
  }

  /**
   * Creates an empty board and returns it.
   */
  makeMtBoard(): Cell[][] {
    let board = new Array(9).fill(DEFAULT_CELL).map(() => new Array(9).fill(DEFAULT_CELL));
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col] = this.newCell(row, col);
      }
    }
    return board
  }
}
