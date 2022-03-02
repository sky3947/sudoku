import { Injectable } from '@angular/core';
import { Cell, cellValuesEqual, DEFAULT_CELL, DEFAULT_CONCRETE, DEFAULT_NOTES, DEFAULT_VALUE } from './cell';

/**
 * Used to pass 'numbers' by reference.
 */
interface Counter {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class SudokuGeneratorService {
  // Used by the solver algorithm to communicate the board's progress.
  private solveFlag: boolean = false;

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

  // Helper function to check if a Cell's value is repeated in its column.
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
   * Checks if the current state of the board breaks any rules.
   * 
   * @param board The board to check.
   * @returns True if the board currently looks valid. False otherwise.
   */
  private isBoardCurrentlyValid(board: Cell[][]): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!this.isValidValue(board, row, col, board[row][col].value)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if the board is solved.
   * 
   * @param board The board to check.
   * @returns True if the board is solved. False otherwise.
   */
  isBoardSolved(board: Cell[][]): boolean {
    return (
      // There are no empty spots.
      !board.some(row => row.some(cell => cellValuesEqual(cell, DEFAULT_CELL))) &&

      // There are no Cells breaking the sudoku rules.
      this.isBoardCurrentlyValid(board)
    );
  }

  /**
   * This is a helper function to map sudoku numbers to their correct indices
   * in a `tries` array. This helps avoid indexing bugs by offloading the
   * responsibility of keeping track of the mapping.
   * 
   * @param aTry The sudoku number of the index to look for.
   * @returns The `tries` index of a given sudoku number.
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
   * Solves a sudoku board using backtracking. If there are any empty Cells
   * after execution, the board is unsolvable.
   * 
   * @param board The board to solve.
   * @param current The current Cell being filled.
   */
  private solveRandomRec(board: Cell[][], current: number): void {
    // Start by checking the end case.
    if (current === 9 * 9) {
      this.solveFlag = true;
      return;
    }

    // The `tries` array remembers which numbers have been tried.
    let tries = new Array(9).fill(false);
    let nextTry = this.nextTry(tries);
    let row = Math.floor(current / 9);
    let col = current % 9;

    // Skip Cells that are already filled in.
    if (board[row][col].value > 0) {
      this.solveRandomRec(board, current + 1);
      return;
    }

    while (nextTry > 0) {
      tries[this.tryAt(nextTry)] = true;

      // Retry if the chosen number (nextTry) is invalid.
      if (!this.isValidValue(board, row, col, nextTry)) {
        nextTry = this.nextTry(tries);
        continue;
      }
      board[row][col].value = nextTry;

      // So far, the tried value is valid. Continue process on next Cell.
      this.solveRandomRec(board, current + 1);

      // Here, the board has been filled or a contradiction occured.
      // Check if board has finished. If so, we're done.
      if (this.solveFlag)
        return;

      // Contradiction occurred, Retry.
      nextTry = this.nextTry(tries);
    }

    // Fall-through; no tries left (contradiction.) Undo and backtrack.
    board[row][col].value = 0;
  }

  /**
   * The wrapper function for `solveRandomRec`.
   */
  private solveRandom(board: Cell[][]): void {
    this.solveFlag = false;
    this.solveRandomRec(board, 0);
  }

  /**
   * Checks if a board has just one unique solution. This is done by counting
   * the number of solutions, stopping if more than one was found.
   * 
   * @param board The board to check for uniqueness.
   * @param current The current cell being tested.
   * @param counter A counter to keep track of the number of solutions.
   */
  private isUniqueBoardRec(board: Cell[][], current: number, counter: Counter): void {
    // The `tries` array remembers which numbers have been tried.
    let tries = new Array(9).fill(false);
    let nextTry = this.nextTry(tries);
    let row = Math.floor(current / 9);
    let col = current % 9;

    // Check end case. If reached, a unique solution was found.
    if (current === 9 * 9) {
      counter.count += 1;
      return;
    }

    // Skip Cells that are already filled in.
    if (board[row][col].value > 0) {
      this.isUniqueBoardRec(board, current + 1, counter);
      return;
    }

    while (nextTry > 0) {
      tries[this.tryAt(nextTry)] = true;

      // Retry if the chosen number (nextTry) is invalid.
      if (!this.isValidValue(board, row, col, nextTry)) {
        nextTry = this.nextTry(tries);
        continue;
      }
      board[row][col].value = nextTry;

      // So far, the tried value is valid. Continue process on next Cell.
      this.isUniqueBoardRec(board, current + 1, counter);

      // Stop and undo changes if more than one solution has been found.
      if (counter.count > 1) {
        board[row][col].value = 0;
        return;
      }

      // To reach here, the board has backtracked after a unique solution or a
      // contradiction. Try to find new solutions.
      nextTry = this.nextTry(tries);
    }

    // Fall-through; no tries left. Undo and backtrack.
    board[row][col].value = 0;
  }

  /**
   * Wrapper function for `isUniqueBoardRec`.
   */
  private isUniqueBoard(board: Cell[][]): boolean {
    let counter: Counter = { count: 0 };

    // Count solutions.
    this.isUniqueBoardRec(board, 0, counter);
    return counter.count === 1;
  }

  private removeValues(board: Cell[][]): void {
    // Keep track of number of values removed.
    let removed = 0;

    // The goal. Reach this number of values left.
    let goal = 30;

    while (goal + removed < 9 * 9) {
      // Try a new Cell to remove
      let aTry = Math.floor(Math.random() * 9 * 9);
      let row = Math.floor(aTry / 9);
      let col = aTry % 9;

      // Check if Cell is already empty.
      if (board[row][col].value === 0)
        continue;

      // Remove a value and make sure there's still only one solution.
      let oldValue = board[row][col].value;
      board[row][col].value = 0;

      // If there's more than one solution, undo and try again with a new Cell.
      if (!this.isUniqueBoard(board)) {
        board[row][col].value = oldValue;
        continue;
      }

      removed += 1;
    }
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
    this.solveRandom(board);

    // Remove values until only 30 are left, only allowing one solution.
    this.removeValues(board);

    // Make values concrete.
    for (const row of board) {
      for (const cell of row) {
        if (cell.value > 0) {
          cell.concrete = true;
        }
      }
    }
  }
}
