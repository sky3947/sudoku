import { Injectable } from '@angular/core';
import { Cell, cellPosEqual, DEFAULT_CELL, DEFAULT_CONCRETE, DEFAULT_NOTES, DEFAULT_VALUE } from './cell';

@Injectable({
  providedIn: 'root'
})
export class SudokuGeneratorService {
  // Used by the solver algorithm to communicate the board's progress.
  private genFinishFlag: boolean = false;

  constructor() { }

  /**
   * Creates a new Cell with given parameters and returns it.
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
  private newCell(row: number, col: number, value?: number, concrete?: boolean, notes?: boolean[]): Cell {
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
    return board;
  }

  // Helper function to check if a Cell is in a certain position.
  private isInPos(cell: Cell, row: number, col: number): boolean {
    return cell.row === row && cell.col === col;
  }

  // Helper function to check if a Cell's value is repeated in its row.
  private isRepeatedInRow(board: Cell[][], row: number, col: number, value: number): boolean {
    return board[row].some(cell => this.isInPos(cell, row, col) ? false : cell.value === value);
  }

  // Helper function to check if a Cell's value is repeatsed in its column.
  private isRepeatedInCol(board: Cell[][], row: number, col: number, value: number): boolean {
    return board.some(innerRow => this.isInPos(innerRow[col], row, col) ? false : innerRow[col].value === value);
  }

  // Helper funtion to check if a Cell's value is repeated in its macro Cell.
  private isRepeatedInMacro(board: Cell[][], row: number, col: number, value: number): boolean {
    let macroRow = row - (row % 3);
    let macroCol = col - (col % 3);

    for (let innerRow = macroRow; innerRow < macroRow + 3; innerRow++) {
      for (let innerCol = macroCol; innerCol < macroCol + 3; innerCol++) {
        if (!(innerRow === row && innerCol === col) && board[innerRow][innerCol].value === value) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks if a Cell is valid (given its row and column.) This check will
   * ignore the given Cell when checking.
   * 
   * @param board The sudoku board to analyze.
   * @param row The row of the Cell to check.
   * @param col The column of the Cell to check.
   * @param value The value of the Cell to check.
   * @returns True if the given Cell is valid. False otherwise.
   */
  isValidValue(board: Cell[][], row: number, col: number, value: number): boolean {
    return (
      // Empty value is always valid.
      value === 0 ||

      (
        // Check values in the same row.
        !this.isRepeatedInRow(board, row, col, value) &&

        // Check values in the same column.
        !this.isRepeatedInCol(board, row, col, value) &&

        // Check values in the same macro Cell.
        !this.isRepeatedInMacro(board, row, col, value)
      )
    );
  }

  /**
   * This is a helper function to map sudoku numbers to their correct indices
   * in a `tries` array. This helps avoid indexing bugs by offloading the
   * responsibility of keeping track of the mapping.
   * 
   * @param aTry The sudoku number of the index to look for.
   * @returns The tries index of a given sudoku number.
   */
  private tryAt(aTry: number) {
    return aTry - 1;
  }

  /**
   * Generates a random value to try on a Cell, given a list of previous tries.
   * Returns 0 if all tries have been exhausted. (Tries range from 1-9,
   * inclusive.)
   * 
   * @param tries Previous attempted values on a Cell.
   * @returns A new value to try.
   */
  private nextTry(tries: boolean[]): number {
    if (tries.every(aTry => aTry === true))
      return 0;

    let aTry = Math.floor((Math.random() * 9) + 1);
    while (tries[this.tryAt(aTry)]) {
      aTry = Math.floor((Math.random() * 9) + 1);
    }
    return aTry;
  }

  /**
   * Fills in an empty sudoku board using backtracking and a finish flag.
   * 
   * @param board The board to solve.
   * @param current The current Cell being filled.
   */
  private fillBoardRandomRec(board: Cell[][], current: number): void {
    // Check the end case.
    if(current === 81) {
      this.genFinishFlag = true;
      return;
    }

    let tries = new Array(9).fill(false);
    let nextTry = this.nextTry(tries);
    let row = Math.floor(current / 9);
    let col = current % 9;
    while (nextTry > 0) {
      tries[this.tryAt(nextTry)] = true;

      if(!this.isValidValue(board, row, col, nextTry)) {
        nextTry = this.nextTry(tries);
        continue;
      }
      board[row][col].value = nextTry;
      board[row][col].concrete = true;

      this.fillBoardRandomRec(board, current + 1);

      // Check if board has finished.
      if (this.genFinishFlag)
        return;
      nextTry = this.nextTry(tries);
    }

    // Fall-through; no tries left.
    console.log('fall-through');
    board[row][col].value = 0;
    board[row][col].concrete = false;
  }

  /**
   * The wrapper function for `fillBoardRandomRec`.
   */
  private fillBoardRandom(board: Cell[][]) {
    this.genFinishFlag = false;
    this.fillBoardRandomRec(board, 0);
  }

  /**
   * Creates a new game of sudoku.
   */
  newGame(board: Cell[][]): void {
    // Clear the board.
    for (const row of board) {
      for (const cell of row) {
        cell.value = DEFAULT_VALUE;
        cell.concrete = DEFAULT_CONCRETE;
        cell.notes = [...DEFAULT_NOTES];
      }
    }

    // Fill the board.
    this.fillBoardRandom(board);

    // Remove values until only 25 are left.
  }
}
